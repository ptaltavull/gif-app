import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  constructor(private firestore: Firestore) { }

  addFavourite(favourite: any){
    const favouriteRef = collection(this.firestore, 'favourites');
    return addDoc(favouriteRef, favourite);
  }
}
