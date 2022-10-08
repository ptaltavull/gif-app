import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GifsPageComponent } from './gifs/gifs-page/gifs-page.component';
import { FavouritePageComponent } from './gifs/favourite-page/favourite-page.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { ForgotPasswordPageComponent } from './auth/forgot-password-page/forgot-password-page.component';
import { RegisterPageComponent } from './auth/register-page/register-page.component';
import { SendEmailComponent } from './auth/send-email/send-email.component';

const routes: Routes = [
    {
        path: '',
        component: GifsPageComponent,
        pathMatch: 'full'
    },
    {
        path: 'favoritos',
        component: FavouritePageComponent,
    },
    {
        path: 'login',
        component: LoginPageComponent
    },
    {
      path: 'recuperar',
      component: ForgotPasswordPageComponent
    },
    {
      path: 'registrar',
      component: RegisterPageComponent
    },
    {
      path: 'verificar',
      component: SendEmailComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
]

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]  
})
export class AppRoutingModule {}