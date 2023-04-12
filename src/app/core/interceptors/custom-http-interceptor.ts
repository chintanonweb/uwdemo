import { Injectable, Inject } from '@angular/core';
import {
  HttpEvent,
  HttpEventType,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { AppService } from 'src/app/app.service';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { environment } from 'src/environments/environment';
const CONTENTTYPE_APP_JSON = 'application/json';
@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private app: AppService, @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth) {
    console.log('CustomHttpInterceptor: singleton object has been created.');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const started = Date.now();
    req = this.getClonedReq(req);
    this.app.setUserInactive(true);
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.ResponseHeader) { }
        else if (event instanceof HttpResponse) {
          const elapsed = Date.now() - started;
          const msg = `CustomHttpInterceptor: Request for ${req.urlWithParams} took ${elapsed}ms.`;
          if (elapsed > 500) {
            console.warn(msg);
          } else {
            console.log(msg);
          }
        }
      }),
      catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse) {
    // TODO: POST TO SERVER AS NEEDED
    if ((err && err.status === 500) || (err && err.status === 400)) {
      const m = err.error.errorDetail[0].errorMessage;
      const e = JSON.parse(JSON.stringify(err));
      e.message = m;
      return Observable.throwError(e);
    } else if (err && err.status === 401) {
      const m = 'You are not authorized to acess this application, please logout and login again. Thank you.';
      const e = JSON.parse(JSON.stringify(err));
      e.message = m;
      return Observable.throwError(e);
    } else if ((err && err.status === 404) || err) {
      const m = 'Unable to process your request. Please check back in few minutes. Thank you.';
      const e = JSON.parse(JSON.stringify(err));
      e.message = m;
      return Observable.throwError(e);
    }
    return Observable.throwError(err);
  }

  getClonedReq(r: HttpRequest<any>) {
    return r.clone({
      headers: this.getHeaders(r.headers)
    });
  }

  getHeaders(reqHdrs: HttpHeaders): HttpHeaders {
    //const authToken = this._oktaAuth.getAccessToken();
    if (environment.environmentName !== 'local') {
      const authToken = this._oktaAuth.getAccessToken();
      return new HttpHeaders(
        Object.assign(
          {},
          {
            'Content-Type': CONTENTTYPE_APP_JSON,
            'Authorization': `Bearer ${authToken}`,
            Accept: CONTENTTYPE_APP_JSON,
            SYSTEM_ID: 'THCR_UI',
            HHSCLOGCONTEXT_GUID_HEADER: this.uuid()

          },
          this.getPassedHeaders(reqHdrs)
        )
      );
    } else {
      return new HttpHeaders(
        Object.assign(
          {},
          {
            'Content-Type': CONTENTTYPE_APP_JSON,
            //'Authorization': `Bearer ${authToken}`,
            Accept: CONTENTTYPE_APP_JSON,
            SYSTEM_ID: 'THCR_UI',
            HHSCLOGCONTEXT_GUID_HEADER: this.uuid()

          },
          this.getPassedHeaders(reqHdrs)
        )
      );
    }


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


  private getPassedHeaders(hdrs: HttpHeaders): object {
    const temp = {};
    if (hdrs && hdrs.keys().length > 0) {
      hdrs.keys().forEach(h => {
        temp[h] = hdrs.get(h);
      });
    }
    return temp;
  }
}
