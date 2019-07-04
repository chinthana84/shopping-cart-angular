import { Component, OnInit } from '@angular/core';
import { ItemService } from '@app/_services/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchObject } from '@app/_shared/_grid/gridModels/searchObject.model';
import { GridOptions } from '@app/_shared/_grid/gridModels/gridOption.model';
import { DataService } from '@app/_services/data.service';
import { Item } from '@app/_models';
import { AlertService } from '@app/_services';
import { GridType } from '@environments/environment';
import { ConfirmDialogService } from '@app/_services/dialog/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html'
})
export class ItemsComponent implements OnInit {
  item: Item;
  items: Item[] = [];
  shoppinCartItemCount$: number;
  searchObject: SearchObject = {};
  gridOption: GridOptions = { colNames: [{ colName: 'itemId' }, { colName: 'itemName' }], datas: {} };

  constructor(private router: Router,
    private _itemSer: ItemService,
    private toastr: ToastrService,
    private dataSer: DataService,
    private alertSer: AlertService,
    private activatedRoute: ActivatedRoute,
    private _itemService: ItemService,
    private _confirmDialogService: ConfirmDialogService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['search'] !== undefined) {
        const so = new SearchObject();
        so.defaultSortColumnName = 'itemId';
        so.passingString = params['search'];
        so.pageNo = 1;
        so.girdId = GridType.ItemsListByName;
        this._itemService.itemSearchListByName(so)
          .subscribe((data: any) => {
            this.gridOption.datas = data;
          });
      } else if (params['s'] === undefined) {
        this.setPage({ pageNo: 1, girdId: GridType.ItemsByCategory, passingId: params['cat'] });
      } else {
        this.setPage({
          pageNo: 1,
          girdId: GridType.ItemsBySubCategory,
          passingId: params['s']
        });
      }
    });

  }

  setPage(obj: SearchObject) {
    obj.defaultSortColumnName = 'itemId';
    this._itemSer.getItemsbySubCatId(obj).subscribe((data: any) => { this.gridOption.datas = data; });
  }

  addShoppingCartItem(item: Item) {
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

  navigateToItem(id: number) {
    this.router.navigate(['/item'], { queryParams: { i: id } });
  }
}
