import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TechEditComponent } from './tech/tech-edit/tech-edit.component';
import { TechService } from './tech/tech-edit/tech.service';

// angularfire
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

// material
import { MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TechListComponent } from './tech/tech-list/tech-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TechEditComponent,
    TechListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule, MatIconModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [ TechService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
