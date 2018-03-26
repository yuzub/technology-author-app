import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { AuthorService } from '../author.service';
import { TechService } from '../../tech/tech.service';

import { Author } from '../author';
import { Tech } from '../../tech/tech';

@Component({
  selector: 'taa-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {
  querySelected = 'All';
  techs$: Observable<Tech[]>;
  authors$: Observable<Author[]>;

  constructor(private authorService: AuthorService, private techService: TechService) { }

  ngOnInit() {
    this.techs$ = this.techService.getTechs();
    this.getAuthors();
  }

  getAuthors(techKey?: string) {
    this.authors$ = this.authorService.getAuthors(techKey);
  }

}
