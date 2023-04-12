import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export abstract class Logger {
  info: any;
  warn: any;
  error: any;
}

const noop = (): any => undefined;

/**
 * Ref: https://robferguson.org/blog/2017/09/09/a-simple-logging-service-for-angular-4/
 */
@Injectable()
export class LoggerService implements Logger {
  constructor(private http: HttpClient) {
    console.log('LoggerService: singleton object has been created.');
  }

  /**
   * Log the message in debug mode to the browser console when debug mode is enabled.
   */
  get debug() {
    if (environment.isDebugMode) {
      return console.log.bind(console);
    } else {
      return noop;
    }
  }

  /**
   * Log the message in info mode to the browser console always.
   */
  get info() {
    return console.log.bind(console);
    // if (environment.isDebugMode) {
    //   return console.log.bind(console);
    // } else {
    //   return noop;
    // }
  }

  /**
   * Log the message in warn mode to the browser console always.
   */
  get warn() {
    return console.warn.bind(console);
  }

  /**
   * Log the message in error mode to the browser console always.
   */
  get error() {
    return console.error.bind(console);
  }

  /**
   * Sends the log message for server side logging.
   * @param message string
   */
  // doServerLog(message: string): void {
  //   const s = this.http
  //     .post(environment.uiErrorLoggerUrl, {
  //       errorMessage: message,
  //       pageUrl: window.location.href
  //     })
  //     .pipe(
  //       map(res => {
  //         return res || {};
  //       }),
  //       catchError(this.handleEror)
  //     )
  //     .subscribe(
  //       data => {},
  //       err => {
  //         this.error('Unable to perform server side logging: ' + err.message);
  //       },
  //       () => {
  //         s.unsubscribe();
  //       }
  //     );
  // }

  handleEror(err: HttpErrorResponse) {
    console.error('LoggerService. handleEror: ', err);
    return Observable.throw(err);
  }
}

