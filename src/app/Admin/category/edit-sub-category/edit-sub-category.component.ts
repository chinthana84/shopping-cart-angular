import { Component, OnInit, Input } from '@angular/core';
import { SubCategoryModel } from '@app/_models';
import { AdminCateogyService } from '@app/_services/admin-cateogy.service';
import { DataService } from '@app/_services/data.service';
import { ModalDialogService } from '@app/_shared/modalDialog/modal-dialog.service';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-sub-category',
  templateUrl: './edit-sub-category.component.html'
})
export class EditSubCategoryComponent implements OnInit {
  subCategoryModel: SubCategoryModel = {};
  subCatID: number;
  status: any = [];
  selectedFile: File = null;
  constructor(private _adminCaCategoryService: AdminCateogyService, private _dataService: DataService,
    private modalService: ModalDialogService, private _http: HttpClient) { }

  ngOnInit() {
    this._adminCaCategoryService.currentSubCatID.subscribe((r: any) => {
      this.subCatID = r;
      if (this.subCatID > 0) {
        this._adminCaCategoryService.getSubCategoryBySubCatID(this.subCatID).subscribe((r: SubCategoryModel) => {
          this.subCategoryModel = r;
        });
      } else {
        this.subCategoryModel = { SubCategoryID: 0, ImageURL: '/assets/images/notfound.png', StatusId: 1 };
      }

    });
    this.status = this._dataService.getStatus();
  }

  AddSubCategory() {
    const subCatId = this.subCategoryModel.SubCategoryID;
    if (subCatId === 0) {
      if (this._adminCaCategoryService.editCategoryModel.listSubCategory === undefined) {
        this._adminCaCategoryService.editCategoryModel.listSubCategory = [];
        }
      this._adminCaCategoryService.editCategoryModel.
        listSubCategory.push(this.subCategoryModel);
    } else {
      const sub: SubCategoryModel = this._adminCaCategoryService.editCategoryModel.listSubCategory
                                                                .find(r => r.SubCategoryID === subCatId);
      this._adminCaCategoryService.editCategoryModel.listSubCategory.
                                                    splice(this._adminCaCategoryService.editCategoryModel.listSubCategory
                                                    .indexOf(sub), 1);

      this._adminCaCategoryService.editCategoryModel.listSubCategory.push(this.subCategoryModel);
    }
    this.modalService.close();
  }

  setStatus(id: number) {
// tslint:disable-next-line: triple-equals
    this.subCategoryModel.StatusDesc = this.status.filter(r => r.id == id)[0].desc;
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    this.onUpload();
  }

  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this._http.post(environment.apiUrl + '//api/image/UploadJsonFileSubCategory', fd).subscribe(r => {
      this.subCategoryModel.ImageURL = r.toString();
    });
  }

  dialogClose() {
    this.modalService.close();
  }
}
