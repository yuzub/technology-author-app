import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

@Component({
  selector: 'taa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'taa';
  connected: Observable<any>;
  constructor(private db: AngularFireDatabase) {
    this.connected = db.object('connected').valueChanges();
    this.connected
      .take(2)
      .subscribe(
        value => console.log(`next - got value ${value}`),
        error => console.log(`error - something wrong occurred: ${error}`),
        () => console.log(`completed`)
      );
  }
}
