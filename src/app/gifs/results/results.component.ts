import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GifsService } from '../services/gifs.service';
import { FavouritesService } from '../services/favourites.service';
import { Gif } from '../interfaces/gifs.interface';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  providers: [AuthService]
})
export class ResultsComponent implements OnInit {

  public user$: Observable<any> = this.authSvc.afAuth.user;

  get results() {
    return this.gifsService.results;
  }

  get favourites() {
    return this.favouriteService.favourites;
  }

  get loaded() {
    return this.gifsService.loaded;
  }

  constructor(private gifsService: GifsService, private authSvc: AuthService, private favouriteService: FavouritesService) { }

  ngOnInit(): void {
    this.user$.subscribe(u => {
      if (u != null) {
        this.favouriteService.getFavourites(u.email);
      }
    })
  }

  public onImageLoad(target: EventTarget) {
    (target as HTMLImageElement).parentElement!.parentElement!.style.display = "flex";
  }

  public isFavourite(gif: Gif) {
    return this.favouriteService.isFavourite(gif.id);
  }
}
