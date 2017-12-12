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

import { ZaalService } from './services/zaal.service';
import { ZalenComponent } from './components/zalen/zaal.component';
import { ZaalEditComponent } from './components/zalen/zaal-edit/zaal-edit.component' 

import { VoorstellingService } from './services/voorstelling.service';
import { VoorstellingComponent } from './components/voorstelling/voorstelling.component';

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
    ZalenComponent,
    ZaalEditComponent,
    VoorstellingComponent,
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
    ZaalService,
    VoorstellingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
