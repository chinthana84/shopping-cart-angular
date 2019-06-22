import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item, ShoppinCartSummary } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private bsShoppingCartCountSource = new BehaviorSubject<ShoppinCartSummary>(new ShoppinCartSummary());
  currentCartCount = this.bsShoppingCartCountSource.asObservable();

  shoppintCartItems: Item[] = [];
  constructor() { }

  currentSPCartCount() {
    const scSummary = new ShoppinCartSummary();
    scSummary.itemsCount = this.getShoppinCartList().length;
    scSummary.Total = this.shoppintCartItems.reduce((acc, val) =>
                      acc + (val.price * val.qty) - (val.price * val.qty * val.discount * 0.01), 0);
    this.bsShoppingCartCountSource.next(scSummary);
  }

  addShoppingCartItem(item: Item) {
    this.shoppintCartItems.push(item);
  }

  deleteShoppingCartItem(item: Item) {
    this.shoppintCartItems = [...this.shoppintCartItems.filter(r => r.itemId !== item.itemId)];
  }

  getShoppinCartList() {
    return this.shoppintCartItems;
  }


}
