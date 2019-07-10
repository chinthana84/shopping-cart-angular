import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item, ShoppinCartSummary } from '@app/_models';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private bsShoppingCartCountSource = new BehaviorSubject<ShoppinCartSummary>(new ShoppinCartSummary());
  currentCartCount = this.bsShoppingCartCountSource.asObservable();

  // Admin login BS
  private bsAdminLogin = new BehaviorSubject<Boolean>(false);
  isAdminLogged = this.bsAdminLogin.asObservable();
  shoppintCartItems: Item[] = [];

  constructor(private localStorageService: LocalStorageService) { }

  adminLogin(b: Boolean) {
    this.localStorageService.setData('isAdminLogin', b);
    this.bsAdminLogin.next(b);
  }

  currentSPCartCount() {
    const scSummary = new ShoppinCartSummary();
    scSummary.itemsCount = this.getShoppinCartList().length;

    scSummary.TotalDiscount = this.shoppintCartItems.reduce((acc, val) =>
    acc +   (val.Price * val.OrderQty * val.Discount * 0.01), 0);

    scSummary.Total = this.shoppintCartItems.reduce((acc, val) =>
      acc + (val.Price * val.OrderQty) - (val.Price * val.OrderQty * val.Discount * 0.01), 0);
    this.bsShoppingCartCountSource.next(scSummary);
  }

  addShoppingCartItem(item: Item): boolean {
    if (this.shoppintCartItems.filter(r => r.ItemID === item.ItemID).length > 0) {
      return false;
    } else {
      this.shoppintCartItems.push(item);
      return true;
    }
  }

  deleteShoppingCartItem(item: Item) {
    this.shoppintCartItems = [...this.shoppintCartItems.filter(r => r.ItemID !== item.ItemID)];
  }

  getShoppinCartList() {
    return this.shoppintCartItems;
  }

  // TODO: db call
  getStatus(): any[] {
    const status: any[] = [{ id: 1, desc: 'Active' }, { id: 2, desc: 'Inactive' }];
    return status;
  }
}
