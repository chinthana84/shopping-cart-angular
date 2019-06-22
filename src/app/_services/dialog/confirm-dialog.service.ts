import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  private subject = new Subject<any>();
  constructor() { }

  confirmThis(message: string, siFn: () => void, noFn: () => void) {
    this.setConfirmation(message, siFn, noFn);
  }
  setConfirmation(message: string, siFn: () => void, noFn: () => void) {
    const that = this;
    this.subject.next({
      type: 'confirm',
      text: message,
      siFn:
        function () {
          that.subject.next(); // this will close the modal
          siFn();
        },
      noFn: function () {
        that.subject.next();
        noFn();
      }
    });

  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
