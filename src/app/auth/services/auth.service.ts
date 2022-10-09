import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

@Injectable()
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  async loginGoogle() {
    try {
      return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    catch (error) {
      console.log(error);
      return;
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    }
    catch (error) {
      console.log(error);
    }
  }

  async sendVerificationEmail(): Promise<void> {
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
