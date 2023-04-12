import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CaseDetailsService {

  constructor(private http: HttpClient) { }

  public getDispositions(data): Observable<any> {
    const Url = environment.baseURL+environment.edgeDispositionsURL
    return this.http.post(Url, data, {});

    // const Url = 'assets/data/edgeDispositions.json';
    // return this.http.get(Url);
    
  }

}

