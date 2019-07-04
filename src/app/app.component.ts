import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User, Item, ShoppinCartSummary, Breadscrub } from './_models';
import { DataService } from './_services/data.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ItemService } from './_services/item.service';
import { HTTPStatus } from './_helpers/HTTPStatus';


// tslint:disable-next-line: component-selector
@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
  currentUser: User;
  HTTPActivity: boolean;
  private shoppinCartItemCount$: ShoppinCartSummary = new ShoppinCartSummary();
  navigationLink$: Observable<Breadscrub[]>;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private _dataService: DataService,
    private _itemService: ItemService,
    private httpStatus: HTTPStatus
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }
  ngOnInit() {
    const scSummary = new ShoppinCartSummary();
    this._dataService.currentCartCount.subscribe(count => this.shoppinCartItemCount$ = count);
   this.httpStatus.getHttpStatus().subscribe((status: boolean) => { this.HTTPActivity = status; });
    this.navigationLink$ = this._dataService.currentNavigation;

  }
  onClickedOutside(e: Event) {
    alert(e);
  }



  test() {

  }
}
