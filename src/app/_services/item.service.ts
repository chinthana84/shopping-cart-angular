import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchObject } from '@app/_shared/_grid/gridModels/searchObject.model';
import { Item } from '@app/_models';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http: HttpClient) { }

  getItemsbyCatId(obj: SearchObject) {
    return this.http.post(environment.apiUrl + '//api/AngularDTQuery', obj);
  }

  getItemsbySubCatId(obj: SearchObject) {
    const data = this.http.post(environment.apiUrl + '//api/AngularDTQuery', obj);
    return data;
  }

  getShoppingCartActions(obj) {
    const data = this.http.post(environment.apiUrl + '//api/AddItemsToCart', obj);
    return data;
  }

  getItem(itemId: number) {
    const item: Item = { itemId: itemId };
    return this.http.post(environment.apiUrl + '//api/WarrantyCard/GetItem', item);
  }

  itemSearchByName(itemName: string) {
    const _URL = `${environment.apiUrl}/api/Item/GetItemSearchByName?SearchItem=` + itemName;
    return this.http.get(_URL);
  }

  itemSearchListByName(so: SearchObject) {
    return this.http.post(environment.apiUrl + '//api/AngularDTQuery', so);
  }
}
