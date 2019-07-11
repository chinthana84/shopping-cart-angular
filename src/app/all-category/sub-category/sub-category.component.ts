import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchObject } from '@app/_shared/_grid/gridModels/searchObject.model';
import { GridOptions } from '@app/_shared/_grid/gridModels/gridOption.model';
import { SubCategoryService } from '@app/_services/sub-category.service';
import { SubCategory, Breadcrumb } from '@app/_models';
import { GridType, environment } from '@environments/environment';
import { DataService } from '@app/_services/data.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html'
})
export class SubCategoryComponent implements OnInit {
  formName = 'Cateogry => SubCategory';
  imagePathUrl = environment.imageUrlPath;
  categoryId: number;
  categoryName: string;
  searchObject: SearchObject = {};
  gridOption: GridOptions = {
    colNames: [ { colName: 'Description' }],
    datas: {}
  };

  constructor(private _dataService: DataService,
     private router: Router, private activatedRoute: ActivatedRoute, private _subCatSer: SubCategoryService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.categoryId = params['c'];
      this.setPage({ pageNo: 1, searchColName: 'Description' });
      this.categoryName = params["name"];
    });

    const arry: Breadcrumb[] = [];
    const bs = new Breadcrumb();
    bs.Url = '/home';
    bs.DisplayText = "Home";
    arry.push(bs);

    const bs2 = new Breadcrumb();
    bs2.Url = '';
    bs2.DisplayText = this.categoryName;
    arry.push(bs2);

    this._dataService.setBreadcrumbPath(arry);
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
