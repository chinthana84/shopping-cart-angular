import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item, ShoppinCartSummary, Breadcrumb } from '@app/_models';
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

  // Breadscrumt
  private bsBreadcrumb = new BehaviorSubject<Breadcrumb[]>([]);
  ListBreadcrumb = this.bsBreadcrumb.asObservable();

  shoppintCartItems: Item[] = [];

  constructor(private localStorageService: LocalStorageService) { }

  adminLogin(b: Boolean) {
    this.localStorageService.setData('isAdminLogin', b);
    this.bsAdminLogin.next(b);
  }

  setBreadcrumbPath(lst: Breadcrumb[]) {
    this.bsBreadcrumb.next(lst);
  }

  currentSPCartCount() {
    const scSummary = new ShoppinCartSummary();
    if (this.localStorageService.getData('shoppingCart') != null) {
      this.shoppintCartItems = this.localStorageService.getData('shoppingCart');
      scSummary.itemsCount = this.getShoppinCartList().length == null ? 0 : this.getShoppinCartList().length;

      scSummary.TotalDiscount = this.shoppintCartItems.reduce((acc, val) =>
        acc + (val.Price * val.OrderQty * val.Discount * 0.01), 0);

      scSummary.Total = this.shoppintCartItems.reduce((acc, val) =>
        acc + (val.Price * val.OrderQty) - (val.Price * val.OrderQty * val.Discount * 0.01), 0);
      this.bsShoppingCartCountSource.next(scSummary);
    }
    else{
      this.shoppintCartItems=[];
      scSummary.itemsCount=0;scSummary.Total=0;
      this.bsShoppingCartCountSource.next(scSummary);
    }
  }

  addShoppingCartItem(item: Item): boolean {
    if (this.shoppintCartItems == null || this.shoppintCartItems.length ==0) {
      this.shoppintCartItems = [];
    }
    if (this.shoppintCartItems.filter(r => r.ItemID === item.ItemID).length > 0) {
      return false;
    } else {
      this.shoppintCartItems.push(item);
      this.localStorageService.setData('shoppingCart', this.shoppintCartItems);
      return true;
    }
  }

  clearShoppingCart() {
    this.localStorageService.removeData('shoppingCart');
    this.currentSPCartCount();
    const scSummary = new ShoppinCartSummary();
    scSummary.itemsCount=0;scSummary.Total=0;
    this.bsShoppingCartCountSource.next(scSummary);
  }

  deleteShoppingCartItem(item: Item) {
    this.shoppintCartItems = [...this.shoppintCartItems.filter(r => r.ItemID !== item.ItemID)];
    this.localStorageService.setData('shoppingCart', this.shoppintCartItems);
  }

  getShoppinCartList() {
    if (this.localStorageService.getData('shoppingCart') != null) {
      this.shoppintCartItems = this.localStorageService.getData('shoppingCart');
      return this.shoppintCartItems;
    } else {
      this.shoppintCartItems = [];
      return this.shoppintCartItems;
    }
  }

  // TODO: db call
  getStatus(): any[] {
    const status: any[] = [{ id: 1, desc: 'Active' }, { id: 2, desc: 'Inactive' }];
    return status;
  }
}
