import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Global } from './Global';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public url: string;
  public identity: string = '';
  public token: string = '';

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  register(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'register', params, { headers: headers });
  }

  login(user: User, gettoken?: boolean): Observable<any> {
    if (gettoken != false) {
      user.gettoken = gettoken;
    }

    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'login', params, { headers: headers });
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity') || '{}');

    if (
      identity &&
      identity != null &&
      identity != 'undefined' &&
      identity != undefined
    ) {
      this.identity = identity;
    } else {
      this.identity = '';
    }

    return this.identity;
  }

  getToken() {
    let token = localStorage.getItem('token');

    if (token && token != 'undefined') {
      this.token = token;
    } else {
      this.token = '';
    }

    return this.token;
  }
}
