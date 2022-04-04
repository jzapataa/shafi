import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso';
import { AuthService } from '../services/auth.service';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public userSubs!: Subscription;
  public ingresosEgresosSubs!: Subscription;
  public token: string = '';
  public ingresosEgresos!: IngresoEgreso[];
  constructor(
    private store: Store<AppState>,
    private _ingresoEgresoService: IngresoEgresoService,
    private _authService: AuthService
  ) {
    this.token = _authService.getToken();
  }

  ngOnInit(): void {
    this.userSubs = this.store.select('user').subscribe((user) => {
      this.ingresosEgresosSubs = this._ingresoEgresoService
        .getIngresosEgresos(this.token)
        .subscribe(
          (response) => {
            this.store.dispatch(
              ingresoEgresoActions.setItems({ items: response.ingresoEgreso })
            );
            this.ingresosEgresos = response.ingresoEgreso;
          },
          (error) => {
            console.log(error);
          }
        );
    });
  }

  ngOnDestroy(): void {
    this.ingresosEgresosSubs.unsubscribe;
    this.userSubs.unsubscribe;
  }
}
