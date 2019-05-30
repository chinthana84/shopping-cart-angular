import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllCategoryService } from '@app/_services/all-category.service';
import { SearchObject } from '@app/_shared/_grid/gridModels/searchObject.model';
import { GridOptions } from '@app/_shared/_grid/gridModels/gridOption.model';

@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.component.html' 
})
export class AllCategoryComponent implements OnInit {

  constructor(private router: Router, 
    private allCategoryService:AllCategoryService) { }
  
  ngOnInit() {
    debugger;
      this.setPage({ pageNo:1,searchColName:'' });

  }

  searchObject:SearchObject={};
  gridOption: GridOptions={
          colNames:[  {colName:'categoryId'},{colName:'description'}  ] ,
          datas:{ }
  }
 
    setPage(obj:SearchObject) {
      debugger 
      obj.girdId=1;
      obj.defaultSortColumnName="categoryId";
  
      this.allCategoryService.getAllCategory(obj).subscribe((data:any)=>{
        this.gridOption.datas =data; 
      });  

     
  }

  selectedCategory(item  ) {
    debugger
    this.router.navigate(['/subCategory']);
  }

}
