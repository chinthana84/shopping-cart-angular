import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { User, Item } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { ConfirmDialogService } from '@app/_services/dialog/confirm-dialog.service';
import { ItemService } from '@app/_services/item.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
declare var $: any;

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit ,AfterViewInit {
    data = `<b>This text is bold</b> and this one is <i>italics</i>`;
    MostSoldItems: Item[];
    MontlyServedCustomoers : string="";
    constructor(private router: Router, private confirmDialogService: ConfirmDialogService,
      private itemService: ItemService) {
        $(document).ready(function () {

        $('.owl-carouselX').owlCarousel({
          loop:true,
          margin:10,
          nav:true,
          autoplay:true 
      });
    });
    }

    ngAfterViewInit() {
      $(document).ready(function () {

        $('.owl-carouselX').owlCarousel({
          loop:true,
          margin:10,
          nav:true,
          autoplay:true 
      });
    });
    }

    ngOnInit() {
      this.itemService.MostSoldItems().subscribe((i: any[]) => {
          this.MostSoldItems = i;
          console.log(i);
      });

      this.itemService.MontlyServedCustomer().subscribe((i:any)=> {
        this.MontlyServedCustomoers=i;
      });
    }
    navigateToItem(itemid: number) {
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
