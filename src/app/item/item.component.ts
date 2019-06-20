import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '@app/_models/user'; 
import { ItemService } from '@app/_services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  item :Item={};
  constructor(private activatedRoute: ActivatedRoute,private _itemSer:ItemService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      debugger;
      this._itemSer.getItem(params['i']).subscribe((data:any)=>{
        this.item=data;
      });
  
    });  
 
  }

}
 
 