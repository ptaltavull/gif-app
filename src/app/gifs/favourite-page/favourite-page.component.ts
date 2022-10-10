import { Component, OnInit } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FavouritesService } from '../services/favourites.service';
import { FavouriteGif } from '../interfaces/favourite-gif';
import { GifsService } from '../services/gifs.service';
import { Gif } from '../interfaces/gifs.interface';

@Component({
  selector: 'app-favourite-page',
  templateUrl: './favourite-page.component.html',
  styleUrls: ['./favourite-page.component.scss'],
  providers: [AuthService]
})
export class FavouritePageComponent implements OnInit {

  public user$: Observable<any> = this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService, private favouriteService: FavouritesService, private gifsService: GifsService) { }

  ngOnInit(): void {
    this.user$.subscribe(async u => {
      if (u != null) {
        await this.favouriteService.getFavourites(u.email);
        this.favouriteService.getFavouriteGifs();
      }

    })
  }

  get favourites(): FavouriteGif[] {
    return this.favouriteService.favourites;
  }

  get favouriteGifs(): Gif[] {
    return this.favouriteService.favouriteGifs;
  }

  public isFavourite(gif: Gif) {
    return this.favouriteService.isFavourite(gif.id);
  }
}
