import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ReactiveFormsModule, FormsModule, NgModel } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { environment } from '../environments/environment';
import * as firebase  from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase,'angularfs'),
    AngularFirestoreModule,
    AngularFireAuthModule
    ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
