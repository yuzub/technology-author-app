import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireObject, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { Author } from "./author";

@Injectable()
export class AuthorService {
  authorsRef: AngularFireList<{}>;

  constructor(private db: AngularFireDatabase) {
    this.authorsRef = db.list('authors');
  }

  // working with FireBase List
  getAuthor(authorKey: string) {

    // Use snapshotChanges().map() to store the key
    return this.db.object(`authors/${authorKey}`).snapshotChanges().map(c => ({ $key: c.payload.key, ...c.payload.val() }));
  }

  getAuthors(techKey: string) {
    console.log(`getAuthors( ${!!techKey} ) start`);
    let authRef = (techKey && techKey !== 'All') ? this.db.list('authors', ref => ref.orderByChild('techKey').equalTo(techKey)) : this.authorsRef;

    // Use snapshotChanges().map() to store the key
    return authRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }));
    });
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
    // path for a true lookup table
    Object.keys(author.authorTechs).forEach(techKey => {
      updateAuthor[`techAuthors/${techKey}/${$key}`] = true;
    });
    console.log(updateAuthor);

    return this.db.object('/').update(updateAuthor)

    // return this.authorsRef.update($key, val)
      .then(_ => console.log('success'))
      .catch(err => console.log(err, 'You don\'t have access!', err));
  }

  deleteAuthor(author: Author) {
    let removeAuthor = {};
    removeAuthor[`authors/${author.$key}`] = null;
    // path for a true lookup table
    Object.keys(author.authorTechs).forEach(techKey => {
      removeAuthor[`techAuthors/${techKey}/${author.$key}`] = null;
    });
    console.log(removeAuthor);

    return this.db.object('/').update(removeAuthor)
      .then(_ => console.log('success'))
      .catch(err => console.log(err, 'You don\'t have access!', err));
  }

}
