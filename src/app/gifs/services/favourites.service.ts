import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, docData, collectionData } from '@angular/fire/firestore';
import { deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  favourites: any[] = [];

  constructor(private firestore: Firestore) { }

  addFavourite(favourite: any) {
    const favouriteRef = collection(this.firestore, 'favourites');
    return addDoc(favouriteRef, favourite);
  }

  async getFavourites(user: string)/* : Observable<any> */ {
    console.log('hi -> ',user);//test
    const favouriteRef = collection(this.firestore, `favourites`);
    //return collectionData(favouriteRef, {idField: 'id'}) as Observable<any>;
    //test
    const q = query(favouriteRef, where("user", "==", user));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.favourites.push(doc.data());
    });
  }

  deleteFavourite(favourite: any) {
    const favouriteRef = doc(this.firestore, `favourites/${favourite.id}`);
    return deleteDoc(favouriteRef);
  }

}
