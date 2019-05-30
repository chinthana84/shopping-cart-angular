import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchObject } from '@app/_shared/_grid/gridModels/searchObject.model';
import { GridOptions } from '@app/_shared/_grid/gridModels/gridOption.model';
import { SubCategoryService } from '@app/_services/sub-category.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html'
})
export class SubCategoryComponent implements OnInit {

  constructor(private router: Router,
              private _subCatSer :SubCategoryService) { }

  ngOnInit() {
    debugger;
      this.setPage({ pageNo:1,searchColName:'' });

  }

  searchObject:SearchObject={};
  gridOption: GridOptions={
          colNames:[  {colName:'subCatId'},{colName:'subCateDescription'}  ] ,
          datas:{ }
  }
 
    setPage(obj:SearchObject) {
      debugger 
      obj.girdId=2;
      obj.defaultSortColumnName="subCatId";
  
      this._subCatSer.getSubCategoryByCategoryId(obj).subscribe((data:any)=>{
        debugger;
        this.gridOption.datas =data; 
      });  

     
  }
  loadItemBySubCatId(item  ) {
    debugger
    this.router.navigate(['/items']);
  }
  
}
