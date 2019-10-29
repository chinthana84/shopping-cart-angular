import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User, Item, ShoppinCartSummary, Breadcrumb, CategoryModel } from './_models';
import { DataService } from './_services/data.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ItemService } from './_services/item.service';
import { HTTPStatus } from './_helpers/HTTPStatus';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from './_services/local-storage.service';
import { AllCategoryService } from './_services/all-category.service';


// tslint:disable-next-line: component-selector
@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
  currentUser: User;
  HTTPActivity: boolean;
  private shoppinCartItemCount$: ShoppinCartSummary = new ShoppinCartSummary();
  isAdminLogged$: Boolean;
  bsList: Breadcrumb[] = [];

  MontlyServedCustomoers : string="";
  categoryModel: CategoryModel[] = [];
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private _dataService: DataService,
    private httpStatus: HTTPStatus,
    private _toaster: ToastrService,
    private localStorageService: LocalStorageService,private allCategoryService: AllCategoryService,private itemService: ItemService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    const scSummary = new ShoppinCartSummary();
 
    this._dataService.currentCartCount.subscribe(count => {
      if (count != null) {
        this.shoppinCartItemCount$ = count;
      } else {
        this.shoppinCartItemCount$.itemsCount = 0;
      }
    });

    this.itemService.MontlyServedCustomer().subscribe((i:any)=> {
      this.MontlyServedCustomoers=i;
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

    this.allCategoryService.getAllActiveCategory().subscribe((r: CategoryModel[]) => {
      this.categoryModel = r;
      console.log(r);
    });

  }

  onSubmit() {
    this._dataService.adminLogin(true);
    this.router.navigate(['/home']);
    this._toaster.success('Admin Logged Sucessfully');
  }

  logOut() {
    this._dataService.adminLogin(false);
    this.router.navigate(['home']);
    this._toaster.success('Logged out form the Admin');
  }

}
