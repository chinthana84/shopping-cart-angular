import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User, Item } from './_models';
import { DataService } from './_services/data.service';
import { Observable } from 'rxjs';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
    currentUser: User;
    shoppinCartItemCount$: number;
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private data:DataService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
       
    }
    ngOnInit() {
        this.data.currentMessage.subscribe(i=>{ 
            debugger;
            this.shoppinCartItemCount$= (i  as Item[]).length;
          });
    

    }



    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}