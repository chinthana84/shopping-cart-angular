import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private bsShoppingCartCountSource=new BehaviorSubject<number>(0);
  currentCartCount=this.bsShoppingCartCountSource.asObservable();

  shoppintCartItems:Item[]=[];
  constructor() { }

  addShoppingCartItem(item:Item){
    this.shoppintCartItems.push(item);
  }

  deleteShoppingCartItem(item:Item){
    this.shoppintCartItems=[...this.shoppintCartItems.filter(r=> r.itemId!=item.itemId)];
  }

  getShoppinCartList(){
    return this.shoppintCartItems;
  }

  currentSPCartCount(){
    this.bsShoppingCartCountSource.next(this.getShoppinCartList().length);
  }
}
