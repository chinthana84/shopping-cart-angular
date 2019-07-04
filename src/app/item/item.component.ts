import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '@app/_models/user';
import { ItemService } from '@app/_services/item.service';
import { DataService } from '@app/_services/data.service';
import { ConfirmDialogService } from '@app/_services/dialog/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  item: Item = {};
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private _itemSer: ItemService,
    private dataSer: DataService,
    private _confirmDialogService: ConfirmDialogService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this._itemSer.getItem(params['i']).subscribe((data: any) => {
        this.item = data;
      });
    });
  }

  addShoppingCartItem(item) {
    const that = this;
    if (this.dataSer.addShoppingCartItem(item) === true) {
      this.dataSer.currentSPCartCount();
      this.router.navigate(['/shoppinCart']);
      this.toastr.success('item added to cart');
    } else {
      this._confirmDialogService.
        confirmThis(`Items already in Shoping cart.do you need to navigate to shoping cart?`,
          function () { that.router.navigate(['/shoppinCart']); },
          function () { });
    }
  }

}

