import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'taa-tech-edit',
  templateUrl: './tech-edit.component.html',
  styleUrls: ['./tech-edit.component.css']
})
export class TechEditComponent implements OnInit {
  tech$: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.tech$ = this.db.object('tech').valueChanges();
  }

  ngOnInit() {
  }

}
