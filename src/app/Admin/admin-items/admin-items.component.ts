import { Component, OnInit } from '@angular/core';
import { SearchObject } from '@app/_shared/_grid/gridModels/searchObject.model';
import { GridOptions } from '@app/_shared/_grid/gridModels/gridOption.model';
import { Router } from '@angular/router';
import { DataService } from '@app/_services/data.service';
import { AdminCateogyService } from '@app/_services/admin-cateogy.service';
import { AdminItemsService } from '@app/_services/admin-items.service';
import { GridType } from '@environments/environment';

@Component({
  selector: 'app-admin-items',
  templateUrl: './admin-items.component.html'
})
export class AdminItemsComponent implements OnInit {
  searchID = 1;
  searchObject: SearchObject = {};
  gridOption: GridOptions = {
    colNames: [{ colName: 'Description' }, { colName: 'Remarks' }],
    datas: {}
  };

  formName = 'Items';
  constructor(private _router: Router,
    private _dateService: DataService,
    private _adminItemService: AdminItemsService) { }

  ngOnInit() {
    this.setPage({ pageNo: 1, searchColName: '' });
  }
  setPage(obj: SearchObject) {
    obj.girdId = GridType.AdminItems;
    obj.defaultSortColumnName = 'Description';
    this._adminItemService.getAllItems(obj).subscribe((data: any) => {
      this.gridOption.datas = data;
    });
  }

  newItem() {
    this._router.navigate(['/EditAdminItems'], { queryParams: { itemId: 0} });
  }

  editItem(obj: any) {
    this._router.navigate(['/EditAdminItems'], { queryParams: { itemId: obj.ItemID } });
  }
}
