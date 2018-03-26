import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/take';
import { AuthorService } from './author/author.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'taa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'taa';
  connected: Observable<any>;

  constructor(private db: AngularFireDatabase, public authorService: AuthService) {
    this.connected = db.object('connected').valueChanges();
    this.connected
      // .take(2)
      .subscribe(
        value => console.log(`You have connected to ${value}`),
        error => console.log(`Error - something wrong occurred: ${error}`),
        () => console.log(`connected completed`)
      );

    
  }
}
