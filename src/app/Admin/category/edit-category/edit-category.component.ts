import { Component, OnInit } from '@angular/core';
import { AdminCateogyService } from '@app/_services/admin-cateogy.service';
import { CategoryModel, SubCategoryModel } from '@app/_models';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.prod';
import { DataService } from '@app/_services/data.service';
import { Router } from '@angular/router';
import { ModalDialogService } from '@app/_shared/modalDialog/modal-dialog.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html'
})
export class EditCategoryComponent implements OnInit {
  selectedFile: File = null;
  editCategoryModel: CategoryModel = {};
  status: any[] = [];
  formStatus = '';

  constructor(
    private _adminCategoryService: AdminCateogyService,
    private _http: HttpClient,
    private _dataService: DataService,
    private _router: Router,
    private modalService: ModalDialogService
  ) { }

  ngOnInit() {
    this._adminCategoryService.getCategoryByID(this._adminCategoryService.editCategoryModel.CategoryID)
      .subscribe(r => {
        console.log(r);
        this.editCategoryModel = r;
        this.formStatus = this.editCategoryModel.CategoryID > 0 ? 'Edit Category' : 'New Category';
        this.status = this._dataService.getStatus();
      });

  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    this.onUpload();
  }
  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this._http.post(environment.apiUrl + '//api/image/UploadJsonFile', fd).subscribe(r => {
      this.editCategoryModel.ImageURL = r.toString();
    });
  }

  saveCategoryX() {
    const c: CategoryModel = this.editCategoryModel;
    this._adminCategoryService.saveCategory(c).subscribe(r => {
      this._router.navigate(['/AdminCategory']);
    });
  }

  editSubCategory(subCategoryModel: SubCategoryModel) {
    this._adminCategoryService.editCategoryModel = this.editCategoryModel;
    this._router.navigate(['/AdminCategory']);
    console.log(subCategoryModel);
  }

  newSubCategory(obj: SubCategoryModel) {
    this._adminCategoryService.editSubCategoryModel = obj;
    this.modalService.open();
  }
}
