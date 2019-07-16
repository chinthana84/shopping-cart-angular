import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/_services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AllCategoryService } from '@app/_services/all-category.service';
import { CategoryModel } from '@app/_models';

@Component({
  selector: 'app-home-category-leftsidemenu',
  templateUrl: './home-category-leftsidemenu.component.html'
})
export class HomeCategoryLeftsidemenuComponent implements OnInit {

  categoryModel: CategoryModel[] = [];
  constructor(private router: Router,
    private allCategoryService: AllCategoryService,
    private route: ActivatedRoute,
    private _dateService: DataService) { }

  ngOnInit() {
    this.allCategoryService.getAllActiveCategory().subscribe((r: CategoryModel[]) => {
      this.categoryModel = r;
    });
  }

}
