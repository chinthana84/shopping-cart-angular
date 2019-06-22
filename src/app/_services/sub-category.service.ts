import { Injectable } from '@angular/core';
import { SearchObject } from '@app/_shared/_grid/gridModels/searchObject.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor(private http: HttpClient) { }

  getSubCategoryByCategoryId(obj: SearchObject) {
    return this.http.post(environment.apiUrl + '//api/AngularDTQuery', obj);
  }
}
