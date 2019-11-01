import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { User, Item } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { ConfirmDialogService } from '@app/_services/dialog/confirm-dialog.service';
import { ItemService } from '@app/_services/item.service';
import { Router } from '@angular/router';
 
declare var jQuery: any;

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit ,AfterViewInit {
    data = `<b>This text is bold</b> and this one is <i>italics</i>`;
    MostSoldItems: Item[];
    MontlyServedCustomoers : string="";
    constructor(private router: Router, private confirmDialogService: ConfirmDialogService,
      private itemService: ItemService) {
        jQuery(function () {
          setTimeout(function () {
            jQuery('.documentation').owlCarousel({
              loop: true,
              autoplay :true,
              margin: 10,
               nav: false,
              responsive: {
                0: {
                  items: 1
                },
                600: {
                  items: 2
                },
                1000: {
                  items: 4
                }
              }
      
            });
          }, 300);


        });
    
    }

    ngAfterViewInit() {
  
    }
  

    ngOnInit() {
      this.itemService.MostSoldItems().subscribe((i: any[]) => {
          this.MostSoldItems = i;
 
          
           var documentArray = i;
          let string:string
          for(let i=0;i<=documentArray.length -1;i++){
           // string += '<div  class="item"><div style="display: inline-block; position: relative; text-align: center;" class="lab-grid-cell w-third--d w-half--t w-full--m"> <div style="    background: #222f3e; height: 200px; overflow: hidden; margin: 2px;    " class="img-hover-zoom img-hover-zoom--brightness"> <img style="cursor:pointer;filter: brightness(80%); width: 100%; height: 100%;" src="'+ documentArray[i].ImageURL +'"> </div> <a href="javascript:void(0);" > <h3 class="doc-category" id="'+'100'+'"  style="position: absolute; bottom: 0; color: #fff; text-align: center; width: 100%;">safsdfasdf</h3></a> </div> </div>';
         
            //`I'm ${age} years old!`
            string += `
            <div class="item">
                <div style="display: inline-block; position: relative; text-align: center;"
                  class="lab-grid-cell w-third--d w-half--t w-full--m">
                  <div style="    background: #222f3e; height: 200px; overflow: hidden; margin: 2px;    "
                    class="img-hover-zoom img-hover-zoom--brightness"> <img
                      style="cursor:pointer;filter: brightness(80%); width: 100%; height: 100%;"
                      src=" ${documentArray[i].ImageURL}"> </div> <a href="javascript:void(0);">
                  </a>
                  <figcaption class="info-wrap border-top">
                      <a href="#" class="title">${documentArray[i].Description}</a>
                      <div *ngIf="i.Discount == 0" class="price mt-1">$2251</div>
                      <div *ngIf="i.Discount > 0" class="price-new">
                         0102 
                        <span><del *ngIf="i.Discount > 0" class="price-old">$2151</del></span>
                      </div>
                    </figcaption>
                </div>
              </div>`;
         
          }
         string = string.replace('undefined','');
         jQuery('.documentation').append(string);

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
