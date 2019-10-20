import { Component, OnInit, ElementRef } from '@angular/core';
import { DataService } from '@app/_services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AllCategoryService } from '@app/_services/all-category.service';
import { CategoryModel } from '@app/_models';
declare var $: any;
@Component({
  selector: 'app-home-category-leftsidemenu',
  templateUrl: './home-category-leftsidemenu.component.html'
})
export class HomeCategoryLeftsidemenuComponent implements OnInit {
  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  categoryModel: CategoryModel[] = [];
  constructor(private allCategoryService: AllCategoryService) { }

  ngOnInit() {

    if ($('.owl-init').length > 0) { // check if element exists

      $(".owl-init").each(function () {

        var myOwl = $(this);
        var data_items = myOwl.data('items');
        var data_nav = myOwl.data('nav');
        var data_dots = myOwl.data('dots');
        var data_margin = myOwl.data('margin');
        var data_custom_nav = myOwl.data('custom-nav');
        var id_owl = myOwl.attr('id');

        myOwl.owlCarousel({
          loop: true,
          margin: data_margin,
          nav: eval(data_nav),
          dots: eval(data_dots),
          autoplay: true,
          items: data_items,
          navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
          //items: 4,
          responsive: {
            0: {
              items: 1
            },
            600: {
              items: data_items
            },
            1000: {
              items: data_items
            }
          }
        });

        // for custom navigation. See example page: example-sliders.html
        $('.' + data_custom_nav + '.owl-custom-next').click(function () {
          $('#' + id_owl).trigger('next.owl.carousel');
        });

        $('.' + data_custom_nav + '.owl-custom-prev').click(function () {
          $('#' + id_owl).trigger('prev.owl.carousel');
        });

      }); // each end.//
    } // end if

    if ($('.owl-init2').length > 0) { // check if element exists

      $(".owl-init2").each(function () {

        var myOwl2 = $(this);
        var data_items = myOwl2.data('items');
        var data_nav = myOwl2.data('nav');
        var data_dots = myOwl2.data('dots');
        var data_margin = myOwl2.data('margin');
        var data_custom_nav = myOwl2.data('custom-nav');
        var id_owl = myOwl2.attr('id');

        myOwl2.owlCarousel({
          loop: true,
          margin: data_margin,
          nav: eval(data_nav),
          dots: eval(data_dots),
          autoplay: true,
          items: data_items,
          navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
          //items: 4,
          responsive: {
            0: {
              items: 1
            },
            600: {
              items: data_items
            },
            1000: {
              items: data_items
            }
          }
        });

        // for custom navigation. See example page: example-sliders.html
        $('.' + data_custom_nav + '.owl-custom-next').click(function () {
          $('#' + id_owl).trigger('next.owl.carousel');
        });

        $('.' + data_custom_nav + '.owl-custom-prev').click(function () {
          $('#' + id_owl).trigger('prev.owl.carousel');
        });

      }); // each end.//
    } // end if

    this.allCategoryService.getAllActiveCategory().subscribe((r: CategoryModel[]) => {
      this.categoryModel = r;
    });
  }

  navigateToItem2() {
    debugger;
    alert('sfsdf');
   // this.router.navigate(['/item'], { queryParams: { i: id } });
  }

}


