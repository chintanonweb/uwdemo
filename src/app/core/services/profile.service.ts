import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggerService } from '../../core/services/logger/logger.service'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  //public loggedInUser: any;

  constructor(private http: HttpClient) { }
  public getLoggedInUser(): Observable<any> {
    // const Url = environment.baseURL+environment.edgeDispositionsURL
    // return this.http.get(Url, {});

    const Url = 'assets/data/loginuser.json';
    return this.http.get(Url);
    
  }
  
}
