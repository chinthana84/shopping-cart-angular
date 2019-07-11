import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AllCategoryService } from '@app/_services/all-category.service';
import { SearchObject } from '@app/_shared/_grid/gridModels/searchObject.model';
import { GridOptions } from '@app/_shared/_grid/gridModels/gridOption.model';
import { Category, Breadcrumb } from '@app/_models';
import { Type } from '@angular/compiler';
import { GridType } from '@environments/environment';
import { HTTPStatus } from '@app/_helpers/HTTPStatus';
import { DataService } from '@app/_services/data.service';
import { environment } from '@environments/environment.prod';

@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.component.html'
})
export class AllCategoryComponent implements OnInit {
  formName = 'All Category';
  imagePathUrl = environment.imageUrlPath;
  searchObject: SearchObject = {};
  gridOption: GridOptions = {
    colNames: [{ colName: 'categoryId' }, { colName: 'description' }],
    datas: {}
  };


  bsList: Breadcrumb[] = [];

  constructor(private router: Router,
    private allCategoryService: AllCategoryService,
    private route: ActivatedRoute,
    private _dateService: DataService) {
  }

  ngOnInit() {
    this.setPage({ pageNo: 1, searchColName: '' });
    this._dateService.isAdminLogged.subscribe((r: any) => {
      this.bsList = r;
    });



    const arry: Breadcrumb[] = [];
    const bs = new Breadcrumb();
    bs.Url = '/home';
    bs.DisplayText = "Home";
    arry.push(bs);
    this._dateService.setBreadcrumbPath(arry);
  }

  setPage(obj: SearchObject) {
    obj.girdId = GridType.Category;
    obj.defaultSortColumnName = 'Description';
    this.allCategoryService.getGridAllCategory(obj).subscribe((data: any) => {
      this.gridOption.datas = data;
    });
  }

  selectedCategory(category: Category) {
    if (category.IsSubCategory) {
      this.router.navigate(['/category/sub/'], { queryParams: { c: category.CategoryID, name: category.Description } });
    } else {
      this.router.navigate(['/category/items'], { queryParams: { cat: category.CategoryID } });
    }
  }

  testNavigation() {
    this.router.navigate(['/home']);
  }

}
