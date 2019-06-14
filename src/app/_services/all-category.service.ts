import { Injectable } from '@angular/core';
 
import { environment } from '@environments/environment';
import { SearchObject } from '@app/_shared/_grid/gridModels/searchObject.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AllCategoryService {

  constructor(private http: HttpClient) { }

  getAllCategory(obj:SearchObject){
         let data=  this.http.post("http://localhost:83/WebAPI//api/AngularDTQuery",obj);


         return data;
  }

  }


