import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FavouritesService } from '../services/favourites.service';

@Component({
  selector: 'app-favourite-page',
  templateUrl: './favourite-page.component.html',
  styleUrls: ['./favourite-page.component.scss'],
  providers: [AuthService]
})
export class FavouritePageComponent implements OnInit {

  public user$: Observable<any> = this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService, private favouriteService: FavouritesService) { }

  ngOnInit(): void {
    this.user$.subscribe(async u => {
      const response = await this.favouriteService.getFavourites(u.email);
      console.log(response);
    });
  }
}
