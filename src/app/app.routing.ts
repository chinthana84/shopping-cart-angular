﻿import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { AllCategoryComponent } from './all-category/all-category.component';
import { SubCategoryComponent } from './all-category/sub-category/sub-category.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ItemComponent } from './item/item.component';
import { ItemsComponent } from './all-category/items/items.component';
import { CategoryComponent } from './Admin/category/category.component';
import { EditCategoryComponent } from './Admin/category/edit-category/edit-category.component';
import { AdminItemsComponent } from './Admin/admin-items/admin-items.component';
import { AdminEditItemsComponent } from './Admin/admin-items/admin-edit-items/admin-edit-items.component';
import { ShoppingCartCheckoutComponent } from './shopping-cart/shopping-cart-checkout/shopping-cart-checkout.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'category', component: AllCategoryComponent },
  { path: 'category/sub', component: SubCategoryComponent },
  { path: 'category/items', component: ItemsComponent },
  { path: 'cat/sub/items', component: ItemsComponent },
  { path: 'shoppinCart', component: ShoppingCartComponent },
  { path: 'item', component: ItemComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'check-out', component: ShoppingCartCheckoutComponent },


  { path: 'AdminCategory', component: CategoryComponent  },
  { path: 'EditCategory', component: EditCategoryComponent },
  { path: 'AdminItems', component: AdminItemsComponent },
  { path: 'EditAdminItems', component: AdminEditItemsComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);
