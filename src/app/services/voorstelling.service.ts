import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Voorstelling } from '../models/voorstelling.model';

@Injectable()
export class VoorstellingService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/voorstellingen'; // URL to web api
  private voorstellingen: Voorstelling[] = [];

  //
  //
  //
  constructor(private http: Http) { }

  //
  //
  //
  public getVoorstellingen(): Promise<Voorstelling[]> {
    console.log('voorstellingen ophalen van server');
    return this.http.get(this.serverUrl, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        return response.json() as Voorstelling[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  //
  //
  //
  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

}