import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User, Item, ShoppinCartSummary } from './_models';
import { DataService } from './_services/data.service';
import { Observable } from 'rxjs';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
  currentUser: User;
  private shoppinCartItemCount$: ShoppinCartSummary = new ShoppinCartSummary();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private dataSer: DataService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }
  ngOnInit() {
    const scSummary = new ShoppinCartSummary();

    this.dataSer.currentCartCount.subscribe(count => this.shoppinCartItemCount$ = count);
  }
}
