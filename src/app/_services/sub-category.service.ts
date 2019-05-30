import { Injectable } from '@angular/core'; 
import { SearchObject } from '@app/_shared/_grid/gridModels/searchObject.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor(private http: HttpClient) { }

  getSubCategoryByCategoryId(obj:SearchObject){
         let data=  this.http.post("http://localhost:83/WebAPI//api/AngularDTQuery",obj);
         return data;
  }
}
