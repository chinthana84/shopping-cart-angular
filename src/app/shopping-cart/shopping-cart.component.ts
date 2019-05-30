import { Component, OnInit } from '@angular/core';
import { ItemService } from '@app/_services/item.service';
import { DataService } from '@app/_services/data.service';
import { Item } from '@app/_models';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {
  item:Item;
  constructor(private _itemSer :ItemService,
    private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(i=>this.item=i );
  }


  
}
