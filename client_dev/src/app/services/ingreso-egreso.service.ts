import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IngresoEgreso } from '../models/ingreso-egreso';
import { AuthService } from './auth.service';
import { Global } from './Global';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  public url: string;

  constructor(private _http: HttpClient, private _authService: AuthService) {
    this.url = Global.url;
  }

  addIngresoEgreso(
    ingresoEgreso: IngresoEgreso,
    token: string
  ): Observable<any> {
    let params = JSON.stringify(ingresoEgreso);

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.post(this.url + 'add-ingreso-egreso', params, {
      headers: headers,
    });
  }
}
