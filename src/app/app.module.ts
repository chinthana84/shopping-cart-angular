import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { routing } from './app.routing';


import { AlertComponent } from './_components';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';;
import { AllCategoryComponent } from './all-category/all-category.component'
import { ChiGridModule } from './_shared/_grid/chi-grid.module';;
import { SubCategoryComponent } from './all-category/sub-category/sub-category.component';
import { ItemsComponent } from './all-category/items/items.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ItemComponent } from './item/item.component';;

import { ItemSearchComponent } from './_shared/item-search/item-search.component';
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing, FormsModule
    , ChiGridModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AllCategoryComponent,
    SubCategoryComponent,
    ItemsComponent
    ,
    ShoppingCartComponent,
    ItemComponent,
    ItemSearchComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }

    // provider used to create fake backend
    , fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
