import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Gif } from '../interfaces/gifs.interface';
import { FavouritesService } from '../services/favourites.service';
import { FavouriteGif } from '../interfaces/favourite-gif';

@Component({
  selector: 'app-gif',
  templateUrl: './gif.component.html',
  styleUrls: ['./gif.component.scss'],
  providers: [AuthService]
})
export class GifComponent implements OnDestroy {

  public user$: Observable<any> = this.authSvc.afAuth.user;
  private subscription: Subscription | undefined;

  @Input() gif: Gif | undefined;
  @Input() favourite: boolean = false;
  @Output() imageLoad: EventEmitter<EventTarget> = new EventEmitter<EventTarget>();

  constructor(private favouriteService: FavouritesService, private authSvc: AuthService) { }

  ngOnDestroy(): void {
      this.subscription?.unsubscribe();
  }

  public onImageLoad(event: Event) {
    this.imageLoad.emit(event.target!);
  }

  public saveFav() {
    this.subscription = this.user$.subscribe(async u => {
      if (u != null) {
        const favourite: FavouriteGif = {
          user: u.email,
          id: this.gif?.id!
        }
        this.favouriteService.saveFavourite(favourite);
      }
    });
  }

  async downloadGif() {
    let a = document.createElement('a');
    //console.log(this.gif?.url.replace(/^https?\:\/\//i, "//"));
    let response = await fetch(this.gif?.url/* .replace(/^https?\:\/\//i, "//") */ || '');
    let file = await response.blob();
    a.download = 'myGif';
    a.href = window.URL.createObjectURL(file);
    a.dataset['downloadurl'] = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
  }
}
