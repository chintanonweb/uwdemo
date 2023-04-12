import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggerService } from '../../core/services/logger/logger.service'
import { environment } from '../../../environments/environment'
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Injectable({
  providedIn: 'root'
})
export class CaseInquiryService {
  searchData;
  searchOutData;
  constructor(private http: HttpClient, private logger: LoggerService, @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth) { }

  public getDispositions(data): Observable<any> {
    // const Url = environment.baseURL + environment.edgeDispositionsURL
    // return this.http.post(Url, data, {});

    const Url = 'assets/data/edgeDispositions.json';
    return this.http.get(Url);

  }
  async downloadPDF(data) {
    const url = environment.baseURL + environment.generateReport;
    const authToken = this._oktaAuth.getAccessToken();
    return await fetch(url, {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'application/pdf',
        SYSTEM_ID: 'THCR_UI',
        HHSCLOGCONTEXT_GUID_HEADER: this.uuid()
      }, body: JSON.stringify(data),
    });
  }

  public setSearchData(data) {
    this.searchData = data;
  }

  uuid(): string {
    var uuidValue = "", k, randomValue;
    for (k = 0; k < 32; k++) {
      randomValue = Math.random() * 16 | 0;

      if (k == 8 || k == 12 || k == 16 || k == 20) {
        uuidValue += "-"
      }
      uuidValue += (k == 12 ? 4 : (k == 16 ? (randomValue & 3 | 8) : randomValue)).toString(16);
    }
    return uuidValue;
  }

  public getSearchData() {
    return this.searchData;
  }

  public setSearchResultsData(data) {
    this.searchOutData = data;
  }
  public getSearchResultsData() {
    return this.searchOutData;
  }
}
