import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Gif } from '../interfaces/gifs.interface';
import { FavouritesService } from '../services/favourites.service';

@Component({
  selector: 'app-gif',
  templateUrl: './gif.component.html',
  styleUrls: ['./gif.component.scss'],
  providers: [AuthService]
})
export class GifComponent implements OnInit {

  public favourite:boolean = false;

  public user$: Observable<any> = this.authSvc.afAuth.user;

  @Input() gif: Gif | undefined;
  @Output() imageLoad: EventEmitter<EventTarget> = new EventEmitter<EventTarget>();

  constructor(private favouriteService: FavouritesService, private authSvc: AuthService) { }

  ngOnInit(): void {
    this.isFavourite();
    console.log(this.gif);
  }

  public onImageLoad(event: Event) {
    this.imageLoad.emit(event.target!);
  }

  public saveFav() {
    this.isFavourite();
    this.user$.subscribe(async u => {
      const favourite = {
        user: u.email,
        gif: this.gif?.url
      }
      const response = await this.favouriteService.saveFavourite(favourite);
    });
  }

  async downloadGif() {
    let a = document.createElement('a');
    let response = await fetch(this.gif?.url || '');
    let file = await response.blob();
    a.download = 'myGif';
    a.href = window.URL.createObjectURL(file);
    a.dataset['downloadurl'] = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
  }

  public isFavourite() {
    this.favourite =  this.favouriteService.isFavourite(this.gif?.url || '');
  }

}
