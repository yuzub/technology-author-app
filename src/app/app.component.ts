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
        value => console.log(`connected next - got value ${value}`),
        error => console.log(`connected error - something wrong occurred: ${error}`),
        () => console.log(`connected completed`)
      );
  }
}
