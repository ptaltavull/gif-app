import { Injectable } from '@angular/core';
import { User, sendEmailVerification } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  async sendVerificationEmail():Promise<void>{
    return (await this.afAuth.currentUser)!.sendEmailVerification();
  }

  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.sendVerificationEmail();
      return result;
    } catch (error) {
      console.log(error);
      return;
    }

  }

  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
      return;
    }

  }

  async getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}
