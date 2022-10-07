import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsPageComponent } from './gifs-page/gifs-page.component';
import { ResultsComponent } from './results/results.component';
import { FavouritePageComponent } from './favourite-page/favourite-page.component';



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
    CommonModule
  ]
})
export class GifsModule { }
