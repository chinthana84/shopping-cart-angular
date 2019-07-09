import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '@app/_services';
import { DataService } from '@app/_services/data.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '@app/_models';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  user: User = {};

  constructor(
    private _dataService: DataService,
    private _router: Router,
    private _toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authenticationService.logout();
  }

  onSubmit() {
    this._dataService.adminLogin(true);
    this._router.navigate(['/home']);
    this._toastr.success('Admin Logged Sucessfully');

    // debugger;
    // this.submitted = true;

    // // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //     return;
    // }

    // this.loading = true;
    // this.authenticationService
    //   .login(this.user.UserName, this.user.Password)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       //this.router.navigate([this.returnUrl]);
    //     },
    //     error => {
    //       //this.alertService.error(error);
    //       //this.loading = false;
    //     }
    //   );
  }
}
