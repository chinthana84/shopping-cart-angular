﻿import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User, Item, ShoppinCartSummary, Breadscrub } from './_models';
import { DataService } from './_services/data.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ItemService } from './_services/item.service';
import { HTTPStatus } from './_helpers/HTTPStatus';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { ToastrService } from 'ngx-toastr';


// tslint:disable-next-line: component-selector
@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements  OnInit {
  currentUser: User;
  HTTPActivity: boolean;
  private shoppinCartItemCount$: ShoppinCartSummary = new ShoppinCartSummary();
  public navigationLink$: Observable<Breadscrub[]>;
  isAdminLogged$: Boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private _dataService: DataService,
    private _itemService: ItemService,
    private httpStatus: HTTPStatus,
    private _toaster: ToastrService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() { 
    const scSummary = new ShoppinCartSummary();
    this._dataService.currentCartCount.subscribe(count => this.shoppinCartItemCount$ = count);
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => { this.HTTPActivity = status; });
    this.navigationLink$ = this._dataService.currentNavigation;
    this._dataService.isAdminLogged.subscribe(r => this.isAdminLogged$ = r);
  }
  onClickedOutside(e: Event) {

  }



  test() {

  }
  logOut() {
    this._dataService.adminLogin(false);
    this.router.navigate(['home']);
    this._toaster.success('Logged out form the Admin');
  }

  // @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {

  //   // Do more processing...
  //   //  alert('sadfasdf');
  //   event.returnValue = false;
  // }

  // ngAfterViewInit() {
  //   // alert('after wi init');
  //   this.isAdminLogged$ = true; //localStorage.getItem('isAdminLogin');
  // }
}
