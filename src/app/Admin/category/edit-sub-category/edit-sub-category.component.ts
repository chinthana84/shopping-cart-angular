import { Component, OnInit, Input } from '@angular/core';
import { SubCategoryModel } from '@app/_models';
import { AdminCateogyService } from '@app/_services/admin-cateogy.service';

@Component({
  selector: 'app-edit-sub-category',
  templateUrl: './edit-sub-category.component.html',
  styleUrls: ['./edit-sub-category.component.css']
})
export class EditSubCategoryComponent implements OnInit {
  subCategoryModel: SubCategoryModel = {};
  constructor(private _adminCaCategoryService: AdminCateogyService) { }

  ngOnInit() {
    this.subCategoryModel = this._adminCaCategoryService.editSubCategoryModel;
    console.log(this.subCategoryModel);
  }

}
