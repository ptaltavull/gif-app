import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GifsService } from '../services/gifs.service';
import { FavouritesService } from '../services/favourites.service';
import { DownloadGifService } from '../services/download-gif.service';

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

  get loaded() {
    return this.gifsService.loaded;
  }

  constructor(private gifsService: GifsService, private authSvc: AuthService, private favouriteService: FavouritesService, private downloadService: DownloadGifService) { }

  ngOnInit(): void {
    this.user$.subscribe(u => {
      this.favouriteService.getFavourites(u.email);
    })
  }

  public onImageLoad(target: EventTarget) {
    (target as HTMLImageElement).parentElement!.parentElement!.style.display = "flex";
  }
}
