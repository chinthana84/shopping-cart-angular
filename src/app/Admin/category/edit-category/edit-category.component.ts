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
 // subCateogryModel: SubCategoryModel = {};

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
        this.editCategoryModel = r;
        this.formStatus = this.editCategoryModel.CategoryID > 0 ? 'Edit Category' : 'New Category';
        this.status = this._dataService.getStatus();

        // this._adminCategoryService.currentMessage.subscribe((rr: SubCategoryModel) => {
        //   this.subCateogryModel = rr;
        // });

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

  editSubCategory(obj: SubCategoryModel) {
    debugger;
    this._adminCategoryService.changeMessage(obj);
    //this._adminCategoryService.editCategoryModel = this.editCategoryModel;
    this.modalService.open();

  }

  newSubCategory(obj: SubCategoryModel) {
    const subCat: SubCategoryModel = { CategoryID: obj.CategoryID, SubCategoryID: 0 };
    this._adminCategoryService.changeMessage(subCat);
    this._adminCategoryService.editCategoryModel = this.editCategoryModel;
    this.modalService.open();
  }
}
