import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { User } from '../models/user';
import { Global } from './Global';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public url: string;
  public identity: any = '';
  public token: string = '';

  constructor(private _http: HttpClient, private store: Store<AppState>) {
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
      this.store.dispatch(authActions.setUser({ user: this.identity }));
    } else {
      this.store.dispatch(authActions.unSetUser());
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
