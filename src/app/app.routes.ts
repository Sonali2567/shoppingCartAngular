import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';

import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
   {
     path:'',
     component:HomeComponent
   },
    
    {
      path:'home',
      component:HomeComponent
    },
    {
      path:'',
      
      children:[
        {
          path:'products',

          component: ProductsComponent

        }
      ]
    },
    {
      path:'cart',
      component:CartComponent
    },
    {
      path:'login',
      component:LoginComponent
    },
    {
      path:'admin',
      component:AdminComponent
    }
    

];
