import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchObject } from '../gridModels/searchObject.model';
import { GridService } from '../grid-service/grid.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html' 
})
export class SearchComponent implements OnInit {

  dropDonwDefautlSelected:number=1;

  searchColumn:string='';
  searchText:string='';

  @Input() 
  searchOptionsX: any = {};


  @Output()
  searchClicked :EventEmitter<any>=new EventEmitter<any>();
  



  searchClick(obj:any,s:string) {
    debugger;
  
    var x:SearchObject= {pageNo:1,
      searchColName:this.searchColumn,
      searchText:this.searchText}

      this.gridService.updateMessage(x);

    this.searchClicked.emit(x);
  }

  constructor(private gridService:GridService) { }

  ngOnInit() {
    debugger;
    this.searchColumn=this.searchOptionsX[0].colName;
  }

}
