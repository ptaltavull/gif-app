import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GifsService } from '../services/gifs.service';
import { FavouritesService } from '../services/favourites.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  providers: [AuthService]
})
export class ResultsComponent {

  public user$: Observable<any> = this.authSvc.afAuth.user;

  get results() {
    return this.gifsService.results;
  }

  get loaded() {
    return this.gifsService.loaded;
  }

  constructor(private gifsService: GifsService, private authSvc: AuthService, private favouriteService: FavouritesService) { }

  public onImageLoad(event: Event) {
    const target = event.target as HTMLImageElement;
    target.parentElement!.style.display = "flex";
  }

  public saveFav(favGif: any) {
    this.user$.subscribe(async u => {
      const favourite = {
        gif: favGif.target.parentNode.parentNode.querySelector("img").src,
        user: u.email
      }
      const response = await this.favouriteService.addFavourite(favourite);
      console.log(response);
    });
  }
}
