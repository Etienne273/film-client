import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Hall } from '../models/hall.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HallService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/halls'; // URL to web api
  private halls: Hall[] = [];
  
  hallsChanged = new Subject<Hall[]>();
  startedEditing = new Subject<number>();
  
  //
  //
  //
  constructor(private http: Http) { }

  //
  //
  //
  public getHalls(): Promise<Hall[]> {
    console.log('halls ophalen van server');
    return this.http.get(this.serverUrl, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        this.halls = response.json() as Hall[];
        return this.halls;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public getHall(index: number):Promise<Hall> {
    console.log('hall ophalen met id');
    return this.http.get(this.serverUrl + '/' + this.halls[index]._id, { headers: this.headers } )
      .toPromise()
      .then(response => {
          console.dir(response.json());
          return response.json() as Hall;
      })
      .catch( error => {
          return this.handleError(error);
      });
}

  public deleteHall(index: number){
    console.log("Hall verwijderen");
    this.http.delete(this.serverUrl + "/" + this.halls[index]._id)
      .toPromise()
      .then( () => {
        console.log("hall verwijderd") 
        this.getHalls()
        .then(
          halls => {
            this.halls = halls
            this.hallsChanged.next(this.halls.slice());
          }
        )
        .catch(error => console.log(error));
      })
      .catch( error => { return this.handleError(error) } );
  }

  public addHall(hall: Hall) {
    console.log('hall opslaan');
    this.http.post(this.serverUrl, { name: hall.name, description: hall.description })
      .toPromise()
      .then( () => {
        console.log("hall toegevoegd")
        this.getHalls()
        .then(
            halls => {
                this.halls = halls
                this.hallsChanged.next(this.halls.slice());
              }
        )
        .catch(error => console.log(error));
      }
      )
      .catch( error => { return this.handleError(error) } );
}

public updateHall(index: number, newHall : Hall){
    console.log("hall updaten");
    this.http.put(this.serverUrl + "/" + this.halls[index]._id, { name: newHall.name, description: newHall.description })
      .toPromise()
      .then( () => {
        console.log("hall veranderd")
        this.getHalls()
        .then(
          halls => {
            this.halls = halls
            this.hallsChanged.next(this.halls.slice());
          }
        )
        .catch(error => console.log(error));
      })
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