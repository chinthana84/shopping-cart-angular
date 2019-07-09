﻿import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User, Item, ShoppinCartSummary } from './_models';
import { DataService } from './_services/data.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ItemService } from './_services/item.service';
import { HTTPStatus } from './_helpers/HTTPStatus';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from './_services/local-storage.service';


// tslint:disable-next-line: component-selector
@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
  currentUser: User;
  HTTPActivity: boolean;
  private shoppinCartItemCount$: ShoppinCartSummary = new ShoppinCartSummary();
  isAdminLogged$: Boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private _dataService: DataService,
    private _itemService: ItemService,
    private httpStatus: HTTPStatus,
    private _toaster: ToastrService,
    private localStorageService: LocalStorageService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    const scSummary = new ShoppinCartSummary();
    this._dataService.currentCartCount.subscribe(count => this.shoppinCartItemCount$ = count);
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => { this.HTTPActivity = status; });
    this._dataService.isAdminLogged.subscribe((r: any) => {
      if (this.localStorageService.getData('isAdminLogin') != undefined) {
        this.isAdminLogged$ = this.localStorageService.getData('isAdminLogin');
      } else {
        this.isAdminLogged$ = r;
      }

    });
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
