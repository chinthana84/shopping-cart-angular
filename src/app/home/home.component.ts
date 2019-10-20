import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { User, Item } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { ConfirmDialogService } from '@app/_services/dialog/confirm-dialog.service';
import { ItemService } from '@app/_services/item.service';
import { Router } from '@angular/router';


@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    data = `<b>This text is bold</b> and this one is <i>italics</i>`;
      MostSoldItems: Item[];
    constructor(private router: Router,private confirmDialogService: ConfirmDialogService,
      private itemService: ItemService) {
    }

    ngOnInit() {
      this.itemService.MostSoldItems().subscribe((i: any[]) => {
          this.MostSoldItems = i;
          console.log(i);
      });
    }
    navigateToItem(itemid: number){
      this.router.navigate(['/item'], { queryParams: { i: itemid } });
    }

    showDialog() {
        this.confirmDialogService.confirmThis('Are you sure to delete?', function () {
            alert('Yes clicked');
        }, function () {
            alert('No clicked');
        });
    }

}
