import { Component, OnInit } from '@angular/core';
import { SearchObject } from '@app/_shared/_grid/gridModels/searchObject.model';
import { GridOptions } from '@app/_shared/_grid/gridModels/gridOption.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '@app/_services/data.service';
import { AdminCateogyService } from '@app/_services/admin-cateogy.service';
import { GridType } from '@environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {
  searchID = 1;
  searchObject: SearchObject = {};
  gridOption: GridOptions = {
    colNames: [{ colName: 'Description' }, { colName: 'Remarks' }],
    datas: {}
  };

  formName = ' ';
  constructor(private _router: Router,
    private _dateService: DataService,
    private _adminCategoryService: AdminCateogyService) { }

  ngOnInit() {
    this.setPage({ pageNo: 1, searchColName: '' });

  }

  setPage(obj: SearchObject) {
    obj.girdId = GridType.AdminCategory;
    obj.defaultSortColumnName = 'Description';
    this._adminCategoryService.getAllAdminCategories(obj).subscribe((data: any) => {
      this.gridOption.datas = data;
    });
  }

  newCategory() {
    this._adminCategoryService.editCategoryModel = { CategoryID: 0, StatusId: 1 };
    this._router.navigate(['/EditCategory']);
  }

  editCategory(item: any) {
    this._adminCategoryService.editCategoryModel = item;
    this._router.navigate(['/EditCategory']);
  }
}
