
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class LoginComponent {

  loginObj: any = {
    username: '',
    password: ''
  };
  constructor(private router: Router) {}

  onLogin() {
    if(this.loginObj.username=="admin" && this.loginObj.password=="admin"){
      this.router.navigateByUrl('/admin');

    }else{
      alert("Invalid Credentials");
    }
  }
}