import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards'; 
import { AllCategoryComponent } from './all-category/all-category.component';
import { SubCategoryComponent } from './all-category/sub-category/sub-category.component';
import { ItemsComponent } from './all-category/items/items.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'allCategory', component: AllCategoryComponent ,
        children:[
            {
                path:"subCategory",component:SubCategoryComponent
            }
        ]

},
   // { path: 'subCategory', component: SubCategoryComponent },
     { path: 'items', component: ItemsComponent },   
     { path: 'shoppinCart', component: ShoppingCartComponent },   
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);