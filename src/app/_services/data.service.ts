import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private messageSource = new BehaviorSubject({});
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(i: Item) {
    this.messageSource.next(i)
  }
}
