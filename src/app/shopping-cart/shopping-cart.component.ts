import { Component, OnInit } from '@angular/core';
import { ItemService } from '@app/_services/item.service';
import { DataService } from '@app/_services/data.service';
import { Item, ShoppinCartSummary } from '@app/_models';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ConfirmDialogService } from '@app/_services/dialog/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { ShoppingCartService } from '@app/_services/shopping-cart.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {
  items: Item[] = [];
  spCartSummary = new ShoppinCartSummary();
  subTotal: number;
  constructor(private _itemSer: ItemService,
    private toastr: ToastrService,
    private dataService: DataService,
    private _confirmDialogService: ConfirmDialogService,
    private _shoppingCartService: ShoppingCartService,
    private router: Router) { }

  ngOnInit() {
    this.items = this.dataService.getShoppinCartList();
    this.dataService.currentCartCount.subscribe((r: ShoppinCartSummary) => {
      this.spCartSummary = r;
    });
  }

  deleteShoppingCartItem(item: Item) {
    const that = this;
    this._confirmDialogService.confirmThis('Are you sure to delete?', function () {
      that.dataService.deleteShoppingCartItem(item);
      that.dataService.currentSPCartCount();
      that.items = that.dataService.getShoppinCartList();
      if (that.items.length === 0) {
        that.router.navigate(['/home']);
      }
      that.toastr.success('deleted item from cart');
    }, function () { });
  }

  triggerUpdate(data: Item) {
    this.dataService.currentSPCartCount();
  }

  checkOut() {
    console.log( this.items);
    this.dataService.clearShoppingCart();
   // this._shoppingCartService.checkoutShoppingCart(this.items).subscribe(r => {

   // });
  }
}
