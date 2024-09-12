import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
//import { LayoutComponent } from './pages/layout/layout.component';
import { ProductsComponent } from './pages/products/products.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
   
    {
       path:'login',
       component:LoginComponent 
       
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
    }
];
