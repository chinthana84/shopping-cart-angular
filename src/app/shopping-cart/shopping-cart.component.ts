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
  item:Item;
  items:any=[];
  constructor(private _itemSer :ItemService,
    private data: DataService) { }

    bSubject = new BehaviorSubject(0); 
    subTotal:number;

  ngOnInit() {
    debugger;
    this.data.currentMessage.subscribe(i=>{ 
      this.items=i;
      this.subTotal=this.items.reduce((acc,val) => acc + (val.price * val.qty), 0);
    });
  
  
  }


  
}
