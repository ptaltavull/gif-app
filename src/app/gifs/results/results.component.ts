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
      const response = await this.favouriteService.saveFavourite(favourite);
      console.log(response);
    });
  }

  async downloadGif(gif: any) {
    let a = document.createElement('a');
    let response = await fetch(gif.target.parentNode.parentNode.querySelector("img").src);
    let file = await response.blob();
    a.download = 'myGif';
    a.href = window.URL.createObjectURL(file);
    a.dataset['downloadurl'] = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
  }

  public isFavourite(gif: any) {
    this.favouriteService.isFavourite(gif.target.parentNode.parentNode.querySelector("img").src);
  }
}
