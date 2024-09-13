import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';

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
    }
];
