import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { ConfirmDialogService } from '@app/_services/dialog/confirm-dialog.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    constructor( private confirmDialogService: ConfirmDialogService ) { }

    showDialog() {
        this.confirmDialogService.confirmThis('Are you sure to delete?', function () {
            alert('Yes clicked');
        }, function () {
            alert('No clicked');
        });
    }
}
