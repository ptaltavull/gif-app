import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authSvc: AuthService, private router: Router) { }

  async onRegister() {
    const { email, password } = this.registerForm.value;
    try {
      const user = await this.authSvc.register(email!, password!);
      if (user) {
        this.router.navigate(['/verificar']);
      }
    }
    catch (error) {
      console.log(error);
    }

  }

}
