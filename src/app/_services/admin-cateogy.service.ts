import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchObject } from '@app/_shared/_grid/gridModels/searchObject.model';
import { environment } from '@environments/environment';
import { CategoryModel, SubCategory, SubCategoryModel } from '@app/_models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminCateogyService {
  private passSubCatIdSource = new BehaviorSubject(0);
  currentSubCatID = this.passSubCatIdSource.asObservable();

  editCategoryModel: CategoryModel = {};
  editSubCategoryModel: SubCategoryModel = {};

  constructor(private _http: HttpClient) { }

  passSubCatID(subCatID: number) {
    this.passSubCatIdSource.next(subCatID);
  }


  getAllAdminCategories(obj: SearchObject) {
    return this._http.post(environment.apiUrl + '//api/AngularDTQuery', obj);
  }

  getAllCategory() {
    return this._http.get(environment.apiUrl + '//api/Category/GetAllCategory');
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

  getSubCategoryByCategoryID(catID) {
    const d = {CategoryID: catID };
    return this._http.get(environment.apiUrl + '//api/Category/GetSubCategoryByCategoryID', { params: d});
  }

  getSubCategoryBySubCatID(subCatID: number) {
    return this._http.get(environment.apiUrl + '//api/Category/GetSubCategoryBySubCatID', {
      params: new HttpParams().set('SubCatID', subCatID.toString())
    });
  }
}
