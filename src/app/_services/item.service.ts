import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchObject } from '@app/_shared/_grid/gridModels/searchObject.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http: HttpClient) { }

  getItemsbySubCatId(obj:SearchObject){
         let data=  this.http.post("http://localhost:83/WebAPI//api/AngularDTQuery",obj);
         return data;
  }

  getShoppingCartActions(obj){
    let data=  this.http.post("http://localhost:83/WebAPI//api/AddItemsToCart",obj);
    return data;
  }
}
