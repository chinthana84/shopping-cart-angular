import { Component, OnInit, ElementRef } from '@angular/core';
import { DataService } from '@app/_services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AllCategoryService } from '@app/_services/all-category.service';
import { CategoryModel, ItemModel } from '@app/_models';
import { ItemService } from '@app/_services/item.service';
declare var $: any;
@Component({
  selector: 'app-home-category-leftsidemenu',
  templateUrl: './home-category-leftsidemenu.component.html'
})
export class HomeCategoryLeftsidemenuComponent implements OnInit {

  categoryModel: CategoryModel[] = [];
  items: ItemModel[]=[];
  constructor(private allCategoryService: AllCategoryService, private itemsService: ItemService) { }

  ngOnInit() {
    this.allCategoryService.getAllActiveCategory().subscribe((r: CategoryModel[]) => {
      this.categoryModel = r;
    });

    this.itemsService.GetSpecialItems().subscribe((r: ItemModel[])=> {
      this.items=r;
      console.log(this.items);
    });

  }

  navigateToItem2() {
    alert('sfsdf');
   // this.router.navigate(['/item'], { queryParams: { i: id } });
  }

}


