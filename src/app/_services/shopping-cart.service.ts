import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '@app/_models';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private _http: HttpClient) { }

  checkoutShoppingCart(items: Item[]) {
    debugger;
    return this._http.post(`http://localhost:83/WebAPI/api/ShoppingCart/CheckoutShoppingCart`,items);
  }

}
