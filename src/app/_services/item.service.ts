import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchObject } from '@app/_shared/_grid/gridModels/searchObject.model';
import { Item } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http: HttpClient) { }

  getItemsbyCatId(obj: SearchObject) {
    return this.http.post("http://localhost:83/WebAPI//api/AngularDTQuery", obj);
  }

  getItemsbySubCatId(obj: SearchObject) {
    let data = this.http.post("http://localhost:83/WebAPI//api/AngularDTQuery", obj);
    return data;
  }

  getShoppingCartActions(obj) {
    let data = this.http.post("http://localhost:83/WebAPI//api/AddItemsToCart", obj);
    return data;
  }

  getItem(itemId: number) {

    let item: Item = {};
    item.itemId = itemId;


    let data = this.http.post("http://localhost:83/WebAPI/api/WarrantyCard/GetItem", item);
    return data;
  }

  itemSearchByName(itemName: string) {
  
      const _URL = "http://localhost:83/WebAPI/api/Item/GetItemSearchByName?SearchItem=" + itemName;
      return this.http.get(_URL);

  }

}
