import { Component, OnInit } from '@angular/core';
import { ItemService } from '@app/_services/item.service';
import { Router } from '@angular/router';
import { SearchObject } from '@app/_shared/_grid/gridModels/searchObject.model';
import { GridOptions } from '@app/_shared/_grid/gridModels/gridOption.model';
import { DataService } from '@app/_services/data.service';
import { Item } from '@app/_models';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html' 
})
export class ItemsComponent implements OnInit {
  item:Item;
  constructor(private router: Router,
    private _itemSer :ItemService,
    private data: DataService) { }

ngOnInit() {
this.setPage({ pageNo:1,searchColName:'' });
  this.data.currentMessage.subscribe(i=> this.item=i);
}

searchObject:SearchObject={};
gridOption: GridOptions={
colNames:[  {colName:'itemId'},{colName:'itemName'}  ] ,
datas:{ }
}

setPage(obj:SearchObject) {
debugger 
obj.girdId=3;
obj.defaultSortColumnName="itemId";

this._itemSer.getItemsbySubCatId(obj).subscribe((data:any)=>{
debugger;
this.gridOption.datas =data; 
});  


}


addShoppingCartItem(item){
  this.data.items.push(item);
  this.data.shoppingCartItemCount
  this.data.changeMessage(item);
  this.router.navigate(['/shoppinCart']);
  
}

}
