import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [AuthService]
})
export class LoginPageComponent {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authSvc: AuthService, private router: Router) { }

  async onLogin() {
    const { email, password } = this.loginForm.value;
    try {
      const user = await this.authSvc.login(email!, password!);
      if (user && user.user?.emailVerified) {
        this.router.navigate(['/']);
      } else if (user) {
        this.router.navigate(['/verificar']);
      } else {
        this.router.navigate(['/registrar']);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  async onGoogleLogin() {
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        this.router.navigate(['/']);
      }
    }
    catch (error) {
      console.log(error);
    }


  }

}
