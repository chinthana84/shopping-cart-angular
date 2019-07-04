import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, finalize, map } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

@Injectable()
export class HTTPStatus {
  private requestInFlight$: BehaviorSubject<boolean>;
  constructor() {
    this.requestInFlight$ = new BehaviorSubject(false);
  }
  setHttpStatus(inFlight: boolean) {
    this.requestInFlight$.next(inFlight);
  }
  getHttpStatus(): Observable<boolean> {
    return this.requestInFlight$.asObservable();
  }
}
