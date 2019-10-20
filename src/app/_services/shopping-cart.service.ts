import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item, Checkout } from '@app/_models';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private _http: HttpClient) { }

  checkoutShoppingCart(CheckOutItems: Checkout) {
    debugger
    return this._http.post(environment.apiUrl + '//api/ShoppingCart/CheckoutShoppingCart', CheckOutItems);
  }

}
