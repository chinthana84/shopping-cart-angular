import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';
import { SearchObject } from '@app/_shared/_grid/gridModels/searchObject.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AllCategoryService {
  constructor(private http: HttpClient) { }

  getAllCategory(obj: SearchObject) {
    return this.http.post(environment.apiUrl + '//api/AngularDTQuery', obj);
  }
}
