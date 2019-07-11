import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule, MatIconModule } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AlertComponent } from './_components';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AllCategoryComponent } from './all-category/all-category.component';
import { ChiGridModule } from './_shared/_grid/chi-grid.module';
import { SubCategoryComponent } from './all-category/sub-category/sub-category.component';
import { ItemsComponent } from './all-category/items/items.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ItemComponent } from './item/item.component';
import { ItemSearchComponent } from './_shared/item-search/item-search.component';
import { ConfirmDialogComponent } from './_components/dialog/confirm-dialog/confirm-dialog.component';
import { HTTPStatus } from './_helpers/HTTPStatus';
import { LoadingAnimationComponent } from './_components/loading-animation/loading-animation.component';
import {ToastrModule} from 'ngx-toastr';
import { ClickOutsideModule } from 'ng-click-outside';
import { ClickOutsideDirective } from './_shared/directive/click-outside.directive';
import { CategoryComponent } from './Admin/category/category.component';
import { EditCategoryComponent } from './Admin/category/edit-category/edit-category.component';
import { EditSubCategoryComponent } from './Admin/category/edit-sub-category/edit-sub-category.component';
import { ModalDialogComponent } from './_shared/modalDialog/modal-dialog/modal-dialog.component';
import { AdminItemsComponent } from './Admin/admin-items/admin-items.component';
import { AdminEditItemsComponent } from './Admin/admin-items/admin-edit-items/admin-edit-items.component';
import { BreadScrubMenuComponent } from './_components/bread-scrub-menu/bread-scrub-menu.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    ChiGridModule,
    FormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    ToastrModule.forRoot(),
    ClickOutsideModule],
  exports: [
    ConfirmDialogComponent
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AllCategoryComponent,
    SubCategoryComponent,
    ItemsComponent,
    ShoppingCartComponent,
    ItemComponent,
    ItemSearchComponent,
    ConfirmDialogComponent,
    LoadingAnimationComponent,
    ClickOutsideDirective,
    CategoryComponent,
    EditCategoryComponent,
    EditSubCategoryComponent,
    ModalDialogComponent,
    AdminItemsComponent,
    AdminEditItemsComponent,
    BreadScrubMenuComponent],
  providers: [
     ErrorInterceptor, HTTPStatus,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
