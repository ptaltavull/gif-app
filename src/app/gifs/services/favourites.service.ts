import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { GifsService } from './gifs.service';
import { FavouriteGif } from '../interfaces/favourite-gif';
import { Gif } from '../interfaces/gifs.interface';
import { firstValueFrom, lastValueFrom, VirtualTimeScheduler } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  favourites: any[] = [];
  favouriteGifs: Gif[] = [];

  constructor(private firestore: Firestore, private gifsService: GifsService) { }

  private addFavourite(favourite: FavouriteGif) {
    const favouriteRef = collection(this.firestore, 'favourites');
    this.favourites.push(favourite);
    return addDoc(favouriteRef, favourite);
  }

  async getFavourites(user: string) {
    this.favourites = [];

    const favouriteRef = collection(this.firestore, `favourites`);
    const q = query(favouriteRef, where("user", "==", user));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.favourites.push(doc.data());
    });
  }

  async getFavouriteGifs() {
    this.favouriteGifs = [];
    this.favourites.forEach(async f => {
      this.gifsService.getGifById(f.id).toPromise().then(gif => {
        this.favouriteGifs.push(gif.data);
      });

    });
    return this.favouriteGifs
  }

  private async deleteFavourite(favourite: FavouriteGif) {
    const favouriteRef = collection(this.firestore, `favourites`);
    const q = query(favouriteRef, where("user", "==", favourite.user), where("id", "==", favourite.id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async d => await deleteDoc(d.ref));
    this.removeFavFromArr(favourite);
  }

  public saveFavourite(favourite: FavouriteGif) {
    if (this.isFavourite(favourite.id)) {
      return this.deleteFavourite(favourite);
    } else {
      return this.addFavourite(favourite);
    }
  }

  public isFavourite(gifId: string) {
    return this.favourites.findIndex(o => o.id === gifId) != -1;
  }

  private removeFavFromArr (favourite: FavouriteGif) {
    const favIndex = this.favourites.findIndex(o => o.gif === favourite);
    const favIndex0 = this.favouriteGifs.findIndex(o => o.id === favourite.id);
    this.favourites.splice(favIndex, 1);
    this.favouriteGifs.splice(favIndex0, 1);
  }
}
