import { Component, OnInit, Input } from '@angular/core';
import { SubCategoryModel } from '@app/_models';
import { AdminCateogyService } from '@app/_services/admin-cateogy.service';
import { DataService } from '@app/_services/data.service';
import { ModalDialogService } from '@app/_shared/modalDialog/modal-dialog.service';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-sub-category',
  templateUrl: './edit-sub-category.component.html',
  styleUrls: ['./edit-sub-category.component.css']
})
export class EditSubCategoryComponent implements OnInit {
  subCategoryModel: SubCategoryModel = {};
  status: any = [];
  selectedFile: File = null;
  constructor(private _adminCaCategoryService: AdminCateogyService, private _dataService: DataService,
    private modalService: ModalDialogService,private _http :HttpClient) { }

  ngOnInit() {
    debugger;
    this._adminCaCategoryService.currentMessage.subscribe((r: any) => {
      this.subCategoryModel = r;
    });
    this.status = this._dataService.getStatus();
  }

  AddSubCategory() {
    debugger;
    if (this.subCategoryModel.SubCategoryID === 0) {
     this._adminCaCategoryService.editCategoryModel.
        listSubCategory.push(this.subCategoryModel);
    }
    this.modalService.close();
  }

  setStatus(id: number) {
    this.subCategoryModel.StatusDesc = this.status.filter(r => r.id==id)[0].desc;
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
}
