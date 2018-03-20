import { Component, OnInit } from '@angular/core';
import { TechService } from '../tech-edit/tech.service';
import { Observable } from 'rxjs/Observable';
import { Tech } from '../tech';

@Component({
  selector: 'taa-tech-list',
  templateUrl: './tech-list.component.html',
  styleUrls: ['./tech-list.component.css']
})
export class TechListComponent implements OnInit {
  techs$: Observable<Tech[]>;

  constructor(private techService: TechService) { }

  ngOnInit() {
    this.getTechs();
  }

  getTechs() {
    this.techs$ = this.techService.getTechs();
  }

}
