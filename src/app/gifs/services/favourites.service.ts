import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, docData } from '@angular/fire/firestore';
import { doc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  constructor(private firestore: Firestore) { }

  addFavourite(favourite: Object){
    const favouriteRef = collection(this.firestore, 'favourites');
    return addDoc(favouriteRef, favourite);
  }

  getFavourites(user: string) {
    const favourites = doc(this.firestore, `favourites/${user}`);
    return docData(favourites, {idField: 'user'});
  }
}
