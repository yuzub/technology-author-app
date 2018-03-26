import 'hammerjs';
import 'firebase/storage'; // global firebase storage js - about 50 lines of code

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { TechEditComponent } from './tech/tech-edit/tech-edit.component';
import { TechListComponent } from './tech/tech-list/tech-list.component';

import { AuthorEditComponent } from './author/author-edit/author-edit.component';
import { AuthorListComponent } from './author/author-list/author-list.component';
import { HomeComponent } from './home/home.component';

import { TechService } from './tech/tech.service';
import { AuthorService } from './author/author.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';

// angularfire
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

// material
import { MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule, MatIconModule, MatSelectModule, MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    TechEditComponent,
    TechListComponent,
    AuthorEditComponent,
    AuthorListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule, AngularFireAuthModule,
    MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule, MatIconModule, MatSelectModule, MatListModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [ TechService, AuthorService, AuthService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
