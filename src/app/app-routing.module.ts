import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechListComponent } from './tech/tech-list/tech-list.component';
import { TechEditComponent } from './tech/tech-edit/tech-edit.component';
import { AuthorListComponent } from './author/author-list/author-list.component';
import { AuthorEditComponent } from './author/author-edit/author-edit.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'tech-list', component: TechListComponent, canActivate: [AuthGuard] },
  { path: 'tech-edit/:id', component: TechEditComponent, canActivate: [AuthGuard] },
  { path: 'author-list', component: AuthorListComponent, canActivate: [AuthGuard] },
  { path: 'author-edit/:id', component: AuthorEditComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
