import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchObject } from '@app/_shared/_grid/gridModels/searchObject.model';
import { GridOptions } from '@app/_shared/_grid/gridModels/gridOption.model';
import { SubCategoryService } from '@app/_services/sub-category.service';
import { SubCategory } from '@app/_models';
import { GridType, environment } from '@environments/environment';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html'
})
export class SubCategoryComponent implements OnInit {
  formName = 'Cateogry => SubCategory';
  imagePathUrl = environment.imageUrlPath;
  categoryId: number;
  searchObject: SearchObject = {};
  gridOption: GridOptions = {
    colNames: [ { colName: 'Description' }],
    datas: {}
  };

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _subCatSer: SubCategoryService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.categoryId = params['c'];
      this.setPage({ pageNo: 1, searchColName: 'Description' });
    });
  }

  setPage(obj: SearchObject) {
    obj.girdId = GridType.SubCategory;
    obj.passingId = this.categoryId;
    obj.defaultSortColumnName = 'Description';

    this._subCatSer.getSubCategoryByCategoryId(obj).subscribe((data: any) => {
      this.gridOption.datas = data;
    });
  }

  loadItemBySubCatId(subCat: SubCategory) {
    this.router.navigate(['/cat/sub/items'], { queryParams: { s: subCat.SubCategoryID } });
  }

}
