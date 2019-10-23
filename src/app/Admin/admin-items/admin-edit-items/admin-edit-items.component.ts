import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AdminItemsService } from '@app/_services/admin-items.service';
import { DataService } from '@app/_services/data.service';
import { ItemModel, CategoryModel, SubCategory, SubCategoryModel } from '@app/_models';
import { AdminCateogyService } from '@app/_services/admin-cateogy.service';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { SearchObject } from '@app/_shared/_grid/gridModels/searchObject.model';

@Component({
  selector: 'app-admin-edit-items',
  templateUrl: './admin-edit-items.component.html'
})

export class AdminEditItemsComponent implements OnInit {
  editItemModel: ItemModel = {};
  categoryModel: CategoryModel[] = [];
  subCategoryModel: SubCategoryModel[] = [];
  status: any = {};
  selectedFile: File = null;

  constructor(private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _adminItemService: AdminItemsService,
    private _http: HttpClient,
    private _dataService: DataService,
    private _adminCategoryService: AdminCateogyService,
    private toastr: ToastrService) { }

  ngOnInit() {
    const itemId = this._activateRoute.snapshot.queryParams['itemId'];

    if (itemId === '0') {
      this._adminCategoryService.getAllCategory().subscribe((cat: any[]) => { this.categoryModel = cat; });
      this.editItemModel.SubCategoryID = 0;
      this.editItemModel.ImageURL = environment.imageNotFoundUrl ;
    } else {
      this._adminItemService.getItemByID(itemId).subscribe(r => {
        this.editItemModel = r;
        this._adminCategoryService.getAllCategory().subscribe((cat: any[]) => { this.categoryModel = cat; });
        if (this.editItemModel.SubCategoryID > 0) {
          this._adminCategoryService.getSubCategoryByCategoryID(this.editItemModel.SubCategoryID).subscribe((rr: any[]) => {
            this.subCategoryModel = rr;
          });
        }
      });
    }
    this.status = this._dataService.getStatus();
  }

  getSubCategoryByCatID(catID) {
    this._adminCategoryService.getSubCategoryByCategoryID(catID.target.value).subscribe((r: any[]) => {
      this.subCategoryModel = r;
      this.editItemModel.SubCategoryID = 0;
    });
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    this.onUpload();
  }

  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this._http.post(environment.apiUrl + '//api/image/UploadJsonFileImages', fd).subscribe(r => {
      this.editItemModel.ImageURL = r.toString();
    });
  }

  saveItem() {
    const c: ItemModel = this.editItemModel;
    console.log(c);
    this._adminItemService.saveItem(c).subscribe(r => {
      this._router.navigate(['/AdminItems']);
      this.toastr.success('Sucessfully item saved.');
    });
  }

  backToItemList() {
    this._router.navigate(['/AdminItems']);
  }
}
