import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/_services/data.service';
import { Breadcrumb } from '@app/_models';

@Component({
  selector: 'app-bread-scrub-menu',
  templateUrl: './bread-scrub-menu.component.html',
  styleUrls: ['./bread-scrub-menu.component.css']
})
export class BreadScrubMenuComponent implements OnInit {
  bsList: Breadcrumb[] = [];
  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.ListBreadcrumb.subscribe((r: any) => {this.bsList = r;  });
  }

}
