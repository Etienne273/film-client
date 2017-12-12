import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Zaal } from '../models/zaal.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ZaalService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/zalen'; // URL to web api
  private zalen: Zaal[] = [];
  
  zalenChanged = new Subject<Zaal[]>();
  startedEditing = new Subject<number>();
  
  //
  //
  //
  constructor(private http: Http) { }

  //
  //
  //
  public getZalen(): Promise<Zaal[]> {
    console.log('Zalen ophalen van server');
    return this.http.get(this.serverUrl, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        this.zalen = response.json() as Zaal[];
        return this.zalen;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public getZaal(index: number):Promise<Zaal> {
    console.log('Zaal ophalen met een specifiek id');
    return this.http.get(this.serverUrl + '/' + this.zalen[index]._id, { headers: this.headers } )
      .toPromise()
      .then(response => {
          console.dir(response.json());
          return response.json() as Zaal;
      })
      .catch( error => {
          return this.handleError(error);
      });
}

  public deleteZaal(index: number){
    console.log("Zaal verwijderen");
    this.http.delete(this.serverUrl + "/" + this.zalen[index]._id)
      .toPromise()
      .then( () => {
        console.log("Zaal is verwijderd") 
        this.getZalen()
        .then(
          zalen => {
            this.zalen = zalen
            this.zalenChanged.next(this.zalen.slice());
          }
        )
        .catch(error => console.log(error));
      })
      .catch( error => { return this.handleError(error) } );
  }

  public addZaal(zaal: Zaal) {
    console.log('Zaal aan het opslaan');
    this.http.post(this.serverUrl, { name: zaal.name, description: zaal.description })
      .toPromise()
      .then( () => {
        console.log("Zaal is toegevoegd")
        this.getZalen()
        .then(
            zalen => {
                this.zalen = zalen
                this.zalenChanged.next(this.zalen.slice());
              }
        )
        .catch(error => console.log(error));
      }
      )
      .catch( error => { return this.handleError(error) } );
}

public updateZaal(index: number, newZaal : Zaal){
    console.log("Zaal updaten");
    this.http.put(this.serverUrl + "/" + this.zalen[index]._id, { name: newZaal.name, description: newZaal.description })
      .toPromise()
      .then( () => {
        console.log("Zaal is geupdate")
        this.getZalen()
        .then(
          zalen => {
            this.zalen = zalen
            this.zalenChanged.next(this.zalen.slice());
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