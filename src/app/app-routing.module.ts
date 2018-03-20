import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TechListComponent } from './tech/tech-list/tech-list.component';
import { TechEditComponent } from './tech/tech-edit/tech-edit.component';

const routes: Routes = [
  { path: 'tech-list', component: TechListComponent },
  { path: 'tech-edit/:id', component: TechEditComponent },
  { path: '', pathMatch: 'full', redirectTo: 'tech-list' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
