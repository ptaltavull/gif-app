import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers:[AuthService]
})
export class LoginPageComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authSvc: AuthService) {}

  ngOnInit(): void {}

  onLogin() {
    const {email, password} = this.loginForm.value;
    this.authSvc.login(email!, password!);
  }

  onGoogleLogin(){

    //service

  }

}
