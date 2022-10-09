import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SearchComponent } from '../gifs/search/search.component';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [
    SidebarComponent,
    SearchComponent,
    LoadingComponent
  ],
  exports: [
    SidebarComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
