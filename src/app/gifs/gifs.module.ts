import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsPageComponent } from './gifs-page/gifs-page.component';
import { ResultsComponent } from './results/results.component';
import { FavouritePageComponent } from './favourite-page/favourite-page.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    GifsPageComponent,
    ResultsComponent,
    FavouritePageComponent
  ],
  exports: [
    GifsPageComponent,
    FavouritePageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class GifsModule { }
