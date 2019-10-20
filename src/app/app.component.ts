import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User, Item, ShoppinCartSummary, Breadcrumb } from './_models';
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
  bsList: Breadcrumb[] = [];
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

    //this._dataService.ListBreadcrumb.subscribe((r: any) => {this.bsList = r;  });
  }



  ngOnInit() {

    const scSummary = new ShoppinCartSummary();
    this._dataService.currentCartCount.subscribe(count => {
      if(count != null){
      this.shoppinCartItemCount$ = count;
      }else{
        this.shoppinCartItemCount$.itemsCount = 0;
      }
     });
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => { this.HTTPActivity = status; });
    this._dataService.currentSPCartCount();


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
  onSubmit() {
    this._dataService.adminLogin(true);
    this.router.navigate(['/home']);
    this._toaster.success('Admin Logged Sucessfully');


  }


  test() {

  }
  logOut() {
    this._dataService.adminLogin(false);
    this.router.navigate(['home']);
    this._toaster.success('Logged out form the Admin');
  }

}
