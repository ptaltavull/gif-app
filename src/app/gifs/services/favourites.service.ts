import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, docData, collectionData } from '@angular/fire/firestore';
import { deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
//import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  favourites: any[] = [];

  constructor(private firestore: Firestore) { }

  private addFavourite(favourite: any) {
    const favouriteRef = collection(this.firestore, 'favourites');
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

  private async deleteFavourite(favourite: any, user: string) {
    const favouriteRef = collection(this.firestore, `favourites`);
    const q = query(favouriteRef, where("user", "==", user), where("gif", "==", favourite));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(d => deleteDoc(d.ref));
    const favIndex = this.favourites.findIndex(o => o.gif === favourite);
    this.favourites.splice(favIndex, 1);
  }

  public saveFavourite(favGif: any) {
    if (this.isFavourite(favGif.gif)) {
      this.deleteFavourite(favGif.gif, favGif.user);
    } else {
      console.log(favGif);
      this.addFavourite(favGif);
    }
  }

  public isFavourite(gif: string) {
    console.log('isFavourite service => ',gif);
    console.log("favourites => ",this.favourites);
    return this.favourites.findIndex(o => o.gif === gif) != -1;
  }
}
