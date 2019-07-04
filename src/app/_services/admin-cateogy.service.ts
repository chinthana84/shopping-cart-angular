import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchObject } from '@app/_shared/_grid/gridModels/searchObject.model';
import { environment } from '@environments/environment';
import { CategoryModel, SubCategory, SubCategoryModel } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class AdminCateogyService {
  editCategoryModel: CategoryModel = {};
  editSubCategoryModel: SubCategoryModel = {};

  constructor(private _http: HttpClient) { }

  getAllAdminCategories(obj: SearchObject) {
    return this._http.post(environment.apiUrl + '//api/AngularDTQuery', obj);
  }

  getCategoryByID(CategoryID: number) {
    return this._http.get(environment.apiUrl + '//api/Category/GetCategoryByID', {
      params: new HttpParams().set('CategoryID', CategoryID.toString())
    });
  }

  saveCategory(editCategoryModel: CategoryModel) {
    return this._http.post(
      environment.apiUrl + '//api/Category/SaveCategory',
      editCategoryModel
    );
  }
}
