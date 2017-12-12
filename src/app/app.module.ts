import { UserService } from './services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpModule, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { DropdownDirective } from './components/shared/dropdown.directive';

import { FilmService } from './services/film.service';
import { FilmsComponent } from './components/films/films.component';
import { FilmStartComponent } from './components/films/film-start/film-start.component'
import { FilmListComponent } from './components/films/film-list/film-list.component'
import { FilmItemComponent } from './components/films/film-list/film-item/film-item.component'
import { FilmDetailComponent } from './components/films/film-detail/film-detail.component'
import { FilmEditComponent } from './components/films/film-edit/film-edit.component'

import { HallService } from './services/hall.service';
import { HallsComponent } from './components/halls/hall.component';
import { HallEditComponent } from './components/halls/hall-edit/hall-edit.component' 

@NgModule({
  declarations: [
    AppComponent,
    DropdownDirective,    
    DashboardComponent,
    HeaderComponent,
    FilmsComponent,
    FilmStartComponent,
    FilmListComponent,
    FilmItemComponent,
    FilmDetailComponent,
    FilmEditComponent,
    HallsComponent,
    HallEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    UserService,
    FilmService,
    HallService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
