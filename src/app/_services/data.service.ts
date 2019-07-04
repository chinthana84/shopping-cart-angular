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

  breadScrub: Breadscrub[] = [];
  shoppintCartItems: Item[] = [];
  constructor() { }

  currentSPCartCount() {
    const scSummary = new ShoppinCartSummary();
    scSummary.itemsCount = this.getShoppinCartList().length;
    scSummary.Total = this.shoppintCartItems.reduce((acc, val) =>
      acc + (val.price * val.qty) - (val.price * val.qty * val.discount * 0.01), 0);
    this.bsShoppingCartCountSource.next(scSummary);
  }

  addShoppingCartItem(item: Item): boolean {
    if (this.shoppintCartItems.filter(r => r.itemId === item.itemId).length > 0) {
      return false;
    } else {
      this.shoppintCartItems.push(item);
      return true;
    }
  }

  deleteShoppingCartItem(item: Item) {
    this.shoppintCartItems = [...this.shoppintCartItems.filter(r => r.itemId !== item.itemId)];
  }

  getShoppinCartList() {
    return this.shoppintCartItems;
  }


  setCurrentNavigation(link: string) {
    const userlist: Breadscrub[] = [];
    this.breadScrub.push({ test: link, url: link });
    this.bsNavigationLink.next(this.breadScrub);
  }

  getStatus(): any[] {
    const status: any[] = [{ id: 1, desc: 'Active' }, { id: 2, desc: 'Inactive' }];
    return status;
  }
}
