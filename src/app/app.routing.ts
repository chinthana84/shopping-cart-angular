import { Routes, RouterModule } from '@angular/router';
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

  { path: 'AdminCategory', component: CategoryComponent },
  { path: 'EditCategory', component: EditCategoryComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
