import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, docData, collectionData } from '@angular/fire/firestore';
import { deleteDoc, doc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  constructor(private firestore: Firestore) { }

  addFavourite(favourite: any) {
    const favouriteRef = collection(this.firestore, 'favourites');
    return addDoc(favouriteRef, favourite);
  }

  getFavourites(user: string): Observable<any> {
    const favouriteRef = collection(this.firestore, `favourites/${user}`);
    return collectionData(favouriteRef, {idField: 'id'}) as Observable<any>;
  } 

  deleteFavourite(favourite: any){
    const favouriteRef = doc(this.firestore, `favourites/${favourite.id}`);
    return deleteDoc(favouriteRef);
  }

}
