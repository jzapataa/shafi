import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso';
import { AuthService } from 'src/app/services/auth.service';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import { AppStateWithIngresoEgreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [],
})
export class DetalleComponent implements OnInit {
  ingresosEgresos: IngresoEgreso[] = [];
  public token: string = '';
  constructor(
    private store: Store<AppStateWithIngresoEgreso>,
    private _ingresoEgresoService: IngresoEgresoService,
    private _authService: AuthService
  ) {
    this.token = this._authService.getToken();
  }

  ngOnInit(): void {
    this.store.select('ingresosEgresos').subscribe(({ items }) => {
      this.ingresosEgresos = items;
    });
  }

  delete(_id: string) {
    this._ingresoEgresoService.deleteIngresoEgreso(this.token, _id).subscribe(
      (response) => {
        this._ingresoEgresoService
          .getIngresosEgresos(this.token)
          .subscribe((response) => {
            this.ingresosEgresos = response.ingresoEgreso;
          });
      },
      (error) => {
        alert('Error en el servidor');
        console.log(error);
      }
    );
  }
}
