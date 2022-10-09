import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss'],
  providers: [AuthService],
})
export class ForgotPasswordPageComponent implements OnInit {

  userEmail = new FormControl('');

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onReset() {
    try {
      const email: string | null = this.userEmail.value;
      await this.authSvc.resetPassword(email!);
      window.alert('Email enviado!');
      this.router.navigate(['/login']);
    }
    catch (error) {
      console.log(error);
    }
  }

}
