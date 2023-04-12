import { Injectable } from '@angular/core';
import {  Subject,Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isLoggedIn: Subject<any> = new Subject();
  userInactive: Subject<any> = new Subject();

  constructor(private http: HttpClient) { }

  getUserInactive(): Observable<any> {
    return this.userInactive.asObservable();
  }

  setUserInactive(value?) {
    this.userInactive.next(value?value:undefined);
  }

  makeUserActive() {
    const Url = environment.baseURL+environment.userActivityURL;
    return this.http.get(Url, {});
  }


}
