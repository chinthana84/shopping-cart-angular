import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalDialogService {
  isShowing = false;
  modal = new Subject();

  getModal() {
      return this.modal;
  }
  open() {
      this.isShowing = true;
      this.modal.next(true);
  }
  close() {
      this.isShowing = false;
      this.modal.next(false);
  }
  closeModal() {
      this.close();
  }
}
