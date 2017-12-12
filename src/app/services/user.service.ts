import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/users'; // URL to web api
  private users: User[] = [];

  //
  //
  //
  constructor(private http: Http) { }

  //
  //
  //
  public getUsers(): Promise<User[]> {
    console.log('users ophalen van server');
    return this.http.get(this.serverUrl, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        return response.json() as User[];
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
