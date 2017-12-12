import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { FilmsComponent } from './components/films/films.component'
import { FilmDetailComponent } from './components/films/film-detail/film-detail.component'
import { FilmStartComponent } from './components/films/film-start/film-start.component'
import { FilmEditComponent } from './components/films/film-edit/film-edit.component'
import { HallsComponent } from './components/halls/hall.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/films', pathMatch: 'full'}, 
  { path: 'films', component: FilmsComponent, children:[
    { path: '',component: FilmStartComponent },
    { path: 'new', component: FilmEditComponent },
    { path: ':id', component: FilmDetailComponent },
    { path: ':id/edit' , component: FilmEditComponent }
  ] },
  { path: 'halls', component: HallsComponent},
  { path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
