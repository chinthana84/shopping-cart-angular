import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, finalize, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HTTPStatus } from './HTTPStatus';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private status: HTTPStatus) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        map(event => {
          this.status.setHttpStatus(true);
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          window.alert(errorMessage);
          return throwError(errorMessage);
        }),
        finalize(() => {
          this.status.setHttpStatus(false);
        })
      );
  }
}


