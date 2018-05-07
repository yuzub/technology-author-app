import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { TechService } from '../tech.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Tech } from '../tech';

@Component({
  selector: 'taa-tech-edit',
  templateUrl: './tech-edit.component.html',
  styleUrls: ['./tech-edit.component.css']
})
export class TechEditComponent implements OnInit {
  isNewTech: boolean;
  techKey: string;
  tech$: Observable<Tech>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private techService: TechService) {
    // this.tech$ = techService.tech$;
  }

  ngOnInit() {
    this.techKey = this.activatedRoute.snapshot.params['id'];
    this.isNewTech = this.techKey === 'new';
    !this.isNewTech ? this.getTech() : this.tech$ = Observable.of({}) as Observable<Tech>;
  }

  getTech() {
    this.tech$ = this.techService.getTech(this.techKey);
  }

  saveTech(tech) {
    const save = this.isNewTech
      ? this.techService.addTech(tech)
      : this.techService.updateTech(tech);

      save.then(_ => this.router.navigate(['/tech-list']))
  }

  // addTech(tech) {
  //   this.techService.addTech(tech);
  // }

  // updateTech(tech) {
  //   this.techService.updateTech(tech);
  // }

  deleteTech(tech) {
    this.techService.deleteTech(tech)
      .then(_ => this.router.navigate(['/tech-list']));
  }

}
