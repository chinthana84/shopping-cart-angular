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
 categoryId:number;
  constructor(private router: Router,private activatedRoute: ActivatedRoute,
              private _subCatSer :SubCategoryService) { }

  ngOnInit() {
    debugger;
      

      this.activatedRoute.queryParams.subscribe(params => {
        debugger;
        this.categoryId=params['c'] ;
        this.setPage({ pageNo:1,searchColName:'' });
    
      });
  }

  searchObject:SearchObject={};
  gridOption: GridOptions={
          colNames:[  {colName:'subCatId'},{colName:'subCateDescription'}  ] ,
          datas:{ }
  }
 
    setPage(obj:SearchObject) {
      debugger 
      obj.girdId=GridType.SubCategory;
      obj.passingId=this.categoryId;
      obj.defaultSortColumnName="subCatId";
  
      this._subCatSer.getSubCategoryByCategoryId(obj).subscribe((data:any)=>{
        debugger;
        this.gridOption.datas =data; 
      });  

     
  }
  loadItemBySubCatId(subCat:SubCategory  ) {
    debugger
    this.router.navigate(['/cat/sub/items'],{ queryParams: { s: subCat.subCatId }} );
  }
  
}
