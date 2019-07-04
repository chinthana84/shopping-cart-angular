import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AllCategoryService } from '@app/_services/all-category.service';
import { SearchObject } from '@app/_shared/_grid/gridModels/searchObject.model';
import { GridOptions } from '@app/_shared/_grid/gridModels/gridOption.model';
import { Category, Breadscrub } from '@app/_models';
import { Type } from '@angular/compiler';
import { GridType } from '@environments/environment';
import { HTTPStatus } from '@app/_helpers/HTTPStatus';
import { DataService } from '@app/_services/data.service';

@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.component.html'
})
export class AllCategoryComponent implements OnInit {
  searchObject: SearchObject = {};
  gridOption: GridOptions = {
    colNames: [{ colName: 'categoryId' }, { colName: 'description' }],
    datas: {}
  };

  breadScrub: Breadscrub[] = [];
  categoryList: Category[] = [];

  constructor(private router: Router,
    private allCategoryService: AllCategoryService,
    private route: ActivatedRoute,
    private _dateService: DataService) {
      this._dateService.setCurrentNavigation('something');
    }

  ngOnInit() {
    this.setPage({ pageNo: 1, searchColName: '' });

  }



  setPage(obj: SearchObject) {
    obj.girdId = GridType.Category;
    obj.defaultSortColumnName = 'categoryId';
    this.allCategoryService.getAllCategory(obj).subscribe((data: any) => {
      this.gridOption.datas = data;
    });
  }

  selectedCategory(category: Category) {
    if (category.isSubCategory) {
      this.router.navigate(['/category/sub/'], { queryParams: { c: category.categoryId } });
    } else {
      this.router.navigate(['/category/items'], { queryParams: { cat: category.categoryId } });
    }
    this._dateService.setCurrentNavigation('allCate');
  }

  testNavigation() {
    this.router.navigate(['/home']);
  }

}
