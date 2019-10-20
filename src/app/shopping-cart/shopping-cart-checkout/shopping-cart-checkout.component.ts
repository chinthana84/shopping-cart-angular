import { Component, OnInit } from '@angular/core';
import { Checkout, Item } from '@app/_models';
import { DataService } from '@app/_services/data.service';
import { ShoppingCartService } from '@app/_services/shopping-cart.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart-checkout',
  templateUrl: './shopping-cart-checkout.component.html'
})
export class ShoppingCartCheckoutComponent implements OnInit {

  constructor(private router: Router,
    private toastr: ToastrService,private _dataService: DataService,
     private _shoppingCartService: ShoppingCartService) { }
  checkoutModel: Checkout = {};
  ngOnInit() {
    this.checkoutModel = { Address1: "", Address2: "", Email: "", ItemsList: [], Name: "", Phone: "" }
  }

  checkOutShoppingCart() {
    let items: Item[];
    items = this._dataService.getShoppinCartList();
    this.checkoutModel.ItemsList = items;
    console.log(this.checkoutModel);
    const c: Checkout = this.checkoutModel;
    this._shoppingCartService.checkoutShoppingCart(c).subscribe( r => {
      this.router.navigate(['/home']);
      this._dataService.clearShoppingCart();
      this.toastr.success(" Done");
      });
  }

}
