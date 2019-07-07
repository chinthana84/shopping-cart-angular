import { Component, OnInit } from '@angular/core';
import { AdminCateogyService } from '@app/_services/admin-cateogy.service';
import { CategoryModel, SubCategoryModel } from '@app/_models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment.prod';
import { DataService } from '@app/_services/data.service';
import { Router } from '@angular/router';
import { ModalDialogService } from '@app/_shared/modalDialog/modal-dialog.service';
import { ToastrService } from 'ngx-toastr';

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
  subCatID: number;

  constructor(
    private _adminCategoryService: AdminCateogyService,
    private _http: HttpClient,
    private _dataService: DataService,
    private _router: Router,
    private modalService: ModalDialogService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    if (this._adminCategoryService.editCategoryModel.CategoryID > 0) {
      this._adminCategoryService.getCategoryByID(this._adminCategoryService.editCategoryModel.CategoryID)
        .subscribe(r => {
          this.editCategoryModel = r;
        });
    } else {
      this.editCategoryModel = { CategoryID: 0, StatusId: 1, ImageURL: environment.imageNotFoundUrl };
    }
    this.formStatus = this.editCategoryModel.CategoryID > 0 ? 'Edit Category' : 'New Category';
    this.status = this._dataService.getStatus();

    this._adminCategoryService.currentSubCatID.subscribe((rr: number) => {
      this.subCatID = rr;
    });

  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    this.onUpload();
  }

  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this._http.post(environment.apiUrl + '//api/image/UploadJsonFile', fd ).subscribe(r => {
      this.editCategoryModel.ImageURL = r.toString();
    });
  }

  saveCategoryX() {
    const c: CategoryModel = this.editCategoryModel;
    this._adminCategoryService.saveCategory(c).subscribe(r => {
      this._router.navigate(['/AdminCategory']);
      this.toastr.success('Sucessfully saved category');
    });
  }

  editSubCategory(obj: SubCategoryModel) {
    this._adminCategoryService.passSubCatID(obj.SubCategoryID);
    this._adminCategoryService.editCategoryModel = this.editCategoryModel;
    this.modalService.open();
  }

  newSubCategory() {
    this._adminCategoryService.passSubCatID(0);
    this._adminCategoryService.editCategoryModel = this.editCategoryModel;
    this.modalService.open();
  }

  clickBack() {
    this._router.navigate(['/AdminCategory']);
  }
}
