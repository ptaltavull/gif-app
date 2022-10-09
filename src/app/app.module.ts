import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { GifsModule } from './gifs/gifs.module';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterPageComponent } from './auth/register-page/register-page.component';
import { ForgotPasswordPageComponent } from './auth/forgot-password-page/forgot-password-page.component';

//firebase
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';

import { provideAuth,getAuth } from '@angular/fire/auth';
import { AuthService } from './auth/services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { SendEmailComponent } from './auth/send-email/send-email.component';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ForgotPasswordPageComponent,
    SendEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    GifsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule,
    provideFirestore(() => getFirestore()),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
