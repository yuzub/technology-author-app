import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireObject, AngularFireList } from "angularfire2/database";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Author } from "./author";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class AuthorService {
  // subject$ = new BehaviorSubject<string>(undefined);
  authorsRef: AngularFireList<{}>;

  constructor(private db: AngularFireDatabase) {
    this.authorsRef = db.list('authors');
  }

  // working with FireBase List
  getAuthor(authorKey: string) {

    // Use snapshotChanges().map() to store the key
    return this.db.object(`authors/${authorKey}`).snapshotChanges()
      .map(c => ({ $key: c.payload.key, ...c.payload.val() }));
  }

  getAuthors(techKey: string): Observable<Author[]> {
    console.log(`getAuthors( ${techKey && techKey !== 'All'} ) start`);

    // let authRef = (techKey && techKey !== 'All')
    //   ? this.db.list('authors', ref => ref.orderByChild('techKey').equalTo(techKey))
    //   : this.authorsRef;

    // let authRef = (techKey && techKey !== 'All')
    //   ? this.db.list(`techAuthors/${techKey}`)
    //   : this.authorsRef;

    // // Use snapshotChanges().map() to store the key
    // return authRef.snapshotChanges().map(changes => {
    //   return changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }));
    // });

    if (techKey && techKey !== 'All') {
      return this.techAuthorsJoin(techKey);
    } else {
      // Use snapshotChanges().map() to store the key
      return this.authorsRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }));
      });
    }
  }

  // obs$: Observable<Observable[]> - an Observable that contains an array of Observables
  // http://rxmarbles.com/#switchMap
  // crazy join
  techAuthorsJoin(techKey: string) {
    // Use snapshotChanges().map() to store the key
    return this.db.list(`techAuthors/${techKey}`).snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }));
      })
      .map(authorKeys => authorKeys
        // Use snapshotChanges().map() to store the key
        .map(author => this.db.object(`authors/${author.$key}`).snapshotChanges()
          .map(c => ({ $key: c.payload.key, ...c.payload.val() }))))
      // to combine all of the Observables into a single Observable - there is operator Observable.combineLatest
      // Observable.combineLatest will only return a value if this combineLatest emits an event
      .switchMap(authorObsArray => authorObsArray.length >= 1
        ? Observable.combineLatest(authorObsArray)
        : Observable.of([]))
      .catch(this.errorHandler);
  }

  addAuthor(author: Author) {
    return this.authorsRef.push(author)
      .then(_ => console.log('success'))
    // .catch(err => console.log(err, 'You don\'t have access!'));
  }

  updateAuthor(author: Author) {
    let { $key, ...val } = author;
    // make an object for multipath updates
    let updateAuthor = {};

    // path for author
    updateAuthor[`authors/${$key}`] = val;

    // path for a true lookup table - techAuthors
    Object.keys(author.authorTechs).forEach(techKey => {
      updateAuthor[`techAuthors/${techKey}/${$key}`] = true;
      // updateAuthor[`techAuthors/${techKey}/${$key}`] = val;
    });
    console.log(updateAuthor);

    // return this.authorsRef.update($key, val)

    // very weird kind of update
    return this.db.object('/').update(updateAuthor)
      .then(_ => console.log('success'))
      .catch(err => console.log(err, 'You don\'t have access!', err));
  }

  deleteAuthor(author: Author) {
    // make an object for multipath removes
    let removeAuthor = {};
    removeAuthor[`authors/${author.$key}`] = null;
    // path for a true lookup table
    Object.keys(author.authorTechs).forEach(techKey => {
      removeAuthor[`techAuthors/${techKey}/${author.$key}`] = null;
    });
    console.log(removeAuthor);

    // return this.authorsRef.remove(author.$key)
    return this.db.object('/').update(removeAuthor)
      .then(_ => console.log('success'))
      .catch(err => console.log(err, 'You don\'t have access!', err));
  }

  private errorHandler(error) {
    console.log(error);
    return Observable.throw(error);
  }

}
