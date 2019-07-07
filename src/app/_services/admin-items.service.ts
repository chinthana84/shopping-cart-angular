import { Injectable } from '@angular/core';
import { SearchObject } from '@app/_shared/_grid/gridModels/searchObject.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { ItemModel } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class AdminItemsService {

  constructor(private _http: HttpClient) { }

  getAllItems(obj: SearchObject) {
    return this._http.post(environment.apiUrl + '//api/AngularDTQuery', obj);
  }

  getItemByID(itemid) {
    const aaa = {ItemId: itemid };
    return this._http.get(environment.apiUrl + '/api/Item/GetItemByID', { params: aaa});
  }

  saveItem(editItemModel: ItemModel) {
    return this._http.post(
      environment.apiUrl + '//api/Item/SaveItem',
      editItemModel
    );
  }
}
