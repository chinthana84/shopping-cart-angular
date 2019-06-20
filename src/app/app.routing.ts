import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards'; 
import { AllCategoryComponent } from './all-category/all-category.component';
import { SubCategoryComponent } from './all-category/sub-category/sub-category.component';
import { ItemsComponent } from './all-category/items/items.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ItemComponent } from './item/item.component';

const appRoutes: Routes = [
     { path: 'home', component: HomeComponent },
     { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'category', component: AllCategoryComponent  },
    { path: 'category/sub', component: SubCategoryComponent },
    { path: 'category/items', component: ItemsComponent },   
    { path: 'cat/sub/items', component: ItemsComponent },   
    { path: 'shoppinCart', component: ShoppingCartComponent }, 
    { path: 'item', component: ItemComponent},  
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);