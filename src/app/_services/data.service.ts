import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item, ShoppinCartSummary, Breadscrub } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private bsShoppingCartCountSource = new BehaviorSubject<ShoppinCartSummary>(new ShoppinCartSummary());
  currentCartCount = this.bsShoppingCartCountSource.asObservable();

  private bsNavigationLink = new BehaviorSubject<Breadscrub[]>(null);
  currentNavigation = this.bsNavigationLink.asObservable();

  // Admin login BS
  private bsAdminLogin = new BehaviorSubject<Boolean>(false);
  isAdminLogged = this.bsAdminLogin.asObservable();

  breadScrub: Breadscrub[] = [];
  shoppintCartItems: Item[] = [];
  constructor() { }

  adminLogin(b: Boolean) {
   // localStorage.setItem('isAdminLogin',b);
    this.bsAdminLogin.next(b);
  }

  currentSPCartCount() {
    const scSummary = new ShoppinCartSummary();
    scSummary.itemsCount = this.getShoppinCartList().length;
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

  setCurrentNavigation(link: string) {
    const userlist: Breadscrub[] = [];
    this.breadScrub.push({ test: link, url: link });
    this.bsNavigationLink.next(this.breadScrub);
  }

  // TODO: db call
  getStatus(): any[] {
    const status: any[] = [{ id: 1, desc: 'Active' }, { id: 2, desc: 'Inactive' }];
    return status;
  }
}
