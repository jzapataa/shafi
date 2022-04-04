import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso';
import { AuthService } from '../services/auth.service';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ui from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  public page_title: string;
  public token: string;
  public ingresoEgreso: IngresoEgreso;
  public status;
  public message;
  public cargando: boolean = false;
  public loadingSubs!: Subscription;
  constructor(
    private _authService: AuthService,
    private _ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {
    this.page_title = 'Agregar Ingreso / Egreso';
    this.token = this._authService.getToken();
    this.ingresoEgreso = new IngresoEgreso('', '', 0, '', '', new Date(), '');
    this.status = '';
    this.message = '';
  }

  ngOnInit(): void {
    this.loadingSubs = this.store
      .select('ui')
      .subscribe((ui) => (this.cargando = ui.isLoading));
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  onSubmit(form: any) {
    this.store.dispatch(ui.isLoading());
    this._ingresoEgresoService
      .addIngresoEgreso(this.ingresoEgreso, this.token)
      .subscribe(
        (response) => {
          console.log(response);
          if (response) {
            this.store.dispatch(ui.stopLoading());
            this.status = 'success';
            form.reset();
          } else {
            this.store.dispatch(ui.stopLoading());
            this.status = 'error';
            this.message = response.message;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
