import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GifsPageComponent } from './gifs/gifs-page/gifs-page.component';
import { FavouritePageComponent } from './gifs/favourite-page/favourite-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

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