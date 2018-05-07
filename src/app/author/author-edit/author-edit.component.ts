import * as firebase from 'firebase/app'; // typings only
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthorService } from '../author.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Author } from '../author';
import { TechService } from '../../tech/tech.service';
import { Tech } from '../../tech/tech';

@Component({
  selector: 'taa-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {
  techs$: Observable<Tech[]>;
  isNewAuthor: boolean;
  authorKey: string;
  // author$: Observable<any>;
  author = {name: ''} as Author;

  selectedTech: Tech;
  authorTechs = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authorService: AuthorService, 
    private techService: TechService) {
    // this.author$ = authorService.author$;
  }

  ngOnInit() {
    this.techs$ = this.techService.getTechs();
    this.authorKey = this.activatedRoute.snapshot.params['id'];
    this.isNewAuthor = this.authorKey === 'new';
    // !this.isNewAuthor ? this.getAuthor() : this.author$ = Observable.of({}) as Observable<Author>
    if (!this.isNewAuthor) { this.getAuthor(); };
  }

  uploadPhoto(event: any) {
    const file = event.srcElement.files[0];
    const storageRef = firebase.storage().ref(`authors/${this.authorKey}`);
    storageRef.put(file)
      .then(uploadTask => this.author.photoUrl = uploadTask.downloadURL);
  }

  // add selected technology to this.author.authorTechs
  addTech() {
    this.author.authorTechs[this.selectedTech.$key] = { name: this.selectedTech.name };
    // call setAuthorTechs() to update this.author.authorTechs object to this.authorTechs array for displaying in a template
    this.setAuthorTechs();
  }

  getAuthor() {
    // this.author$ = this.authorService.getAuthor(this.authorKey);
    this.authorService.getAuthor(this.authorKey)
      .subscribe(author => {
        this.author = author;
        this.setAuthorTechs();
      });
  }

  setAuthorTechs() {
    if (this.author.authorTechs == null) { this.author.authorTechs = {}; };
    this.authorTechs = Object.keys(this.author.authorTechs).map(key => this.author.authorTechs[key]); // !!!
  }

  saveAuthor(author) {
    const save = this.isNewAuthor
      ? this.authorService.addAuthor(author)
      : this.authorService.updateAuthor(author);

      save.then(_ => this.router.navigate(['/author-list']))
  }

  // addAuthor(author) {
  //   this.authorService.addAuthor(author);
  // }

  // updateAuthor(author) {
  //   this.authorService.updateAuthor(author);
  // }

  deleteAuthor(author) {
    this.authorService.deleteAuthor(author)
      .then(_ => this.router.navigate(['/author-list']));
  }

}
