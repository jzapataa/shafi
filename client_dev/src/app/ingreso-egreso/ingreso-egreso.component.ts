import { Component, OnInit } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso';
import { AuthService } from '../services/auth.service';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [],
})
export class IngresoEgresoComponent implements OnInit {
  public page_title: string;
  public token: string;
  public ingresoEgreso: IngresoEgreso;
  public status;
  public message;
  constructor(
    private _authService: AuthService,
    private _ingresoEgresoService: IngresoEgresoService
  ) {
    this.page_title = 'Agregar Ingreso / Egreso';
    this.token = this._authService.getToken();
    this.ingresoEgreso = new IngresoEgreso('', '', 0, '', '', new Date(), '');
    this.status = '';
    this.message = '';
  }

  ngOnInit(): void {}

  onSubmit(form: any) {
    this._ingresoEgresoService
      .addIngresoEgreso(this.ingresoEgreso, this.token)
      .subscribe(
        (response) => {
          console.log(response);
          if (response) {
            this.status = 'success';
            form.reset();
          } else {
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
