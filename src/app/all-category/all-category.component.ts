import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AllCategoryService } from '@app/_services/all-category.service';
import { SearchObject } from '@app/_shared/_grid/gridModels/searchObject.model';
import { GridOptions } from '@app/_shared/_grid/gridModels/gridOption.model';
import { Category } from '@app/_models';

@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.component.html' 
})
export class AllCategoryComponent implements OnInit {
  searchObject:SearchObject={};
  gridOption: GridOptions={
          colNames:[  {colName:'categoryId'},{colName:'description'}  ] ,
          datas:{ }
  }
  constructor(private router: Router,private allCategoryService:AllCategoryService,private route: ActivatedRoute) { }
  
  ngOnInit() {
      this.setPage({ pageNo:1,searchColName:'' });
  }


 
  setPage(obj:SearchObject) {
    obj.girdId=1;
    obj.defaultSortColumnName="categoryId";
    this.allCategoryService.getAllCategory(obj).subscribe((data:any)=>{
      this.gridOption.datas =data; 
    });     
  }

  selectedCategory(category :Category  ) {
    this.router.navigate(['/category/sub/'], { queryParams: { c: category.categoryId } }  );
  }

}
