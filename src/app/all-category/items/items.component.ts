import { Component, OnInit } from '@angular/core';
import { ItemService } from '@app/_services/item.service';
import { Router } from '@angular/router';
import { SearchObject } from '@app/_shared/_grid/gridModels/searchObject.model';
import { GridOptions } from '@app/_shared/_grid/gridModels/gridOption.model';
import { DataService } from '@app/_services/data.service';
import { Item } from '@app/_models';
import { AlertService } from '@app/_services';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html' 
})
export class ItemsComponent implements OnInit {
  item:Item;
  shoppinCartItemCount$: number;
  searchObject:SearchObject={};
  gridOption: GridOptions={colNames:[  {colName:'itemId'},{colName:'itemName'}],datas:{ }};

  constructor(private router: Router,private _itemSer :ItemService,private dataSer: DataService,
    private alertSer:AlertService) {}

    
  ngOnInit() {
  this.setPage({ pageNo:1,searchColName:'' });

  }

  setPage(obj:SearchObject) {
    obj.girdId=3;
    obj.defaultSortColumnName="itemId";
    this._itemSer.getItemsbySubCatId(obj).subscribe((data:any)=>{ this.gridOption.datas =data;});  
  }

  addShoppingCartItem(item){
    debugger;
    this.dataSer.addShoppingCartItem(item);
    this.dataSer.currentSPCartCount();
    this.router.navigate(['/shoppinCart']); 
    //this.toastr.success("Success", 'You are on right track.');
  }
  navigateToItem(id){
    this.router.navigate(['/item'],{ queryParams: { i:id}} );
  }
}
