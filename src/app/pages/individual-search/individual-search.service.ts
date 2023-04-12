import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggerService } from '../../core/services/logger/logger.service'
import { environment } from '../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class IndividualSearchService {
  searchData;
  searchOutData
  constructor(private http: HttpClient, private logger: LoggerService) { }

  public getData(data): Observable<any> {
    // const Url = environment.baseURL + environment.individualSearchURL
    // return this.http.post(Url, data, {});

    const Url = '../../../assets/data/getIndividuals.json';
    return this.http.get(Url, data);
  }

  public setSearchData(data) {
    this.searchData = data;
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
