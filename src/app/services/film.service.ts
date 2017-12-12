import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Film } from '../models/film.model';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class FilmService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/films'; // URL to web api
  private films: Film[] = [];

  filmsChanged = new Subject<Film[]>();
  
  //
  //
  //
  constructor(private http: Http) {
    // this.readFilms();
   }

  //
  //
  //
  public getFilms(): Promise<Film[]> {
    console.log('films ophalen van server');
    return this.http.get(this.serverUrl, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        this.films = response.json() as Film[];
        return this.films
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  // private readFilms() {
    
  //   console.log('readFilms');
    
  //   this.http.get(this.serverUrl)
  //       .map((response: Response) => {
  //       console.log('map');
  //       const films: Film[] = response.json();
  //       return films;
  //       })
  //       .subscribe((films: Film[]) => {
  //       console.log('subscribe');
  //       this.films = films;
  //       console.dir(this.films);
  //       this.filmsChanged.next(this.films.slice());
  //       });
  //     }

  public getFilm(index: number): Promise<Film> {
    console.log('film ophalen met id');
    return this.http.get(this.serverUrl + '/' + this.films[index]._id, { headers: this.headers })
      .toPromise()
      .then(response => {
          console.dir(response.json());
          return response.json() as Film;
      })
      .catch( error => {
          return this.handleError(error);
      });
}

public updateFilm(index: number, newFilm : Film){
    console.log("film updaten");
    this.http.put(this.serverUrl + "/" + this.films[index]._id, { name: newFilm.name, description: newFilm.description, imagePath: newFilm.imagePath })
      .toPromise()
      .then( () => {
        console.log("film veranderd")
        this.getFilms()
        .then(
          films => {
            this.films = films
            this.filmsChanged.next(this.films.slice());
          }
        )
        .catch(error => console.log(error));
      })
      .catch( error => { return this.handleError(error) } );
  }

  public deleteFilm(index: number){
    console.log("Film verwijderen");
    this.http.delete(this.serverUrl + "/" + this.films[index]._id)
      .toPromise()
      .then( () => {
        console.log("film verwijderd") 
        this.getFilms()
        .then(
          films => {
            this.films = films
            this.filmsChanged.next(this.films.slice());
          }
        )
        .catch(error => console.log(error));
      })
      .catch( error => { return this.handleError(error) } );
  }

  public addFilm(film: Film) {
    console.log('film opslaan');
    this.http.post(this.serverUrl, { name: film.name, description: film.description, imagePath: film.imagePath })
      .toPromise()
      .then( () => {
        console.log("film toegevoegd")
        this.getFilms()
        .then(
            films => {
                this.films = films
                this.filmsChanged.next(this.films.slice());
              }
        )
        .catch(error => console.log(error));
      }
      )
      .catch( error => { return this.handleError(error) } );
}

  //
  //
  //
  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

}