import { Component, OnInit } from '@angular/core';
import { ItemService } from '@app/_services/item.service';
import { DataService } from '@app/_services/data.service';
import { Item } from '@app/_models';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {
  items: any = [];

  subTotal: number;

  constructor(private _itemSer: ItemService, private dataService: DataService) { }



  ngOnInit() {
    // debugger;
    // this.data.currentMessage.subscribe(i=>{
    //   this.items=i;
    //   this.subTotal=this.items.reduce((acc,val) => acc + (val.price * val.qty), 0);
    // });
    this.items = this.dataService.getShoppinCartList();

  }

  deleteShoppingCartItem(item: Item) {
    this.dataService.deleteShoppingCartItem(item);
    this.dataService.currentSPCartCount();
    this.items = this.dataService.getShoppinCartList();
  }



}
