import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchObject } from '@app/_shared/_grid/gridModels/searchObject.model';
import { GridOptions } from '@app/_shared/_grid/gridModels/gridOption.model';
import { SubCategoryService } from '@app/_services/sub-category.service';
import { SubCategory } from '@app/_models';
import { GridType } from '@environments/environment';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html'
})
export class SubCategoryComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private _subCatSer: SubCategoryService) { }
 categoryId: number;
 searchObject: SearchObject = {};

  gridOption: GridOptions = {
          colNames: [  {colName: 'subCatId'}, {colName: 'subCateDescription'}  ] ,
          datas: { }
  };

  ngOnInit() {
      this.activatedRoute.queryParams.subscribe(params => {
        this.categoryId = params['c'] ;
        this.setPage({ pageNo: 1, searchColName: '' });
      });
  }

    setPage(obj: SearchObject) {
      obj.girdId = GridType.SubCategory;
      obj.passingId = this.categoryId;
      obj.defaultSortColumnName = 'subCatId';

      this._subCatSer.getSubCategoryByCategoryId(obj).subscribe((data: any) => {
        this.gridOption.datas = data;
      });


  }
  loadItemBySubCatId(subCat: SubCategory  ) {
    this.router.navigate(['/cat/sub/items'], { queryParams: { s: subCat.subCatId }} );
  }

}
