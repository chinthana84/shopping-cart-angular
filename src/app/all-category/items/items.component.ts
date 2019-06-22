import { Component, OnInit } from '@angular/core';
import { ItemService } from '@app/_services/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchObject } from '@app/_shared/_grid/gridModels/searchObject.model';
import { GridOptions } from '@app/_shared/_grid/gridModels/gridOption.model';
import { DataService } from '@app/_services/data.service';
import { Item } from '@app/_models';
import { AlertService } from '@app/_services';
import { GridType } from '@environments/environment';

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

  constructor(private router: Router, private _itemSer: ItemService, private dataSer: DataService,
    private alertSer: AlertService, private activatedRoute: ActivatedRoute, private _itemService: ItemService) { }


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

  addShoppingCartItem(item) {
    this.dataSer.addShoppingCartItem(item);
    this.dataSer.currentSPCartCount();
    this.router.navigate(['/shoppinCart']);

  }
  navigateToItem(id) {
    this.router.navigate(['/item'], { queryParams: { i: id } });
  }
}
