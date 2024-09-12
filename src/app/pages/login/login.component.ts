import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutComponent } from "../layout/layout.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, LayoutComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

   loginObj: any={
    username:'',
    password:''
   }
  constructor(private router: Router) { }
   onLogin(){
    if(this.loginObj.username=='sonali' && this.loginObj.password=='sonali123'){
     this.router.navigateByUrl('/products');
}
    else{
    alert('Invalid Credentials')
   }
  }
}