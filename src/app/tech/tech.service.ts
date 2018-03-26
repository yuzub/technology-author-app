import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireObject, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { Tech } from "./tech";

@Injectable()
export class TechService {
  // techRef: AngularFireObject<{}>;
  // tech$: Observable<{}>;
  techsRef: AngularFireList<{}>;
  techs$: Observable<Tech[]>;

  constructor(private db: AngularFireDatabase) {
    // this.techRef = db.object('tech');
    // this.tech$ = this.techRef.valueChanges();

    this.techsRef = db.list('techs');
    // Use snapshotChanges().map() to store the key
    this.techs$ = this.techsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }));
    });
  }

  // working with FireBase List
  getTech(techKey: string) {
    // return this.db.object(`techs/${techKey}`).valueChanges();
    return this.db.object(`techs/${techKey}`).snapshotChanges().map(c => ({ $key: c.payload.key, ...c.payload.val() }));
  }

  getTechs() {
    return this.techs$;
  }

  addTech(tech: Tech) {
    return this.techsRef.push(tech)
      .then(_ => console.log('success'))
      // .catch(err => console.log(err, 'You don\'t have access!'));
  }

  updateTech(tech: Tech) {
    let { $key, ...val } = tech;
    return this.techsRef.update($key, val)
      .then(_ => console.log('success'))
      .catch(err => console.log(err, 'You don\'t have access!'));
  }

  deleteTech(tech: Tech) {
    return this.techsRef.remove(tech.$key)
      .then(_ => console.log('success'))
      .catch(err => console.log(err, 'You don\'t have access!'));
  }

}
