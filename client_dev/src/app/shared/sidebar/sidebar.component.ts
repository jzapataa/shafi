import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { Global } from 'src/app/services/Global';
import * as authActions from '../../auth/auth.actions';
import * as ingresoEgresoActions from '../../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  public identity;
  public token;
  public url;
  public nombre: string = '';

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.identity = this._authService.getIdentity();
    this.token = this._authService.getToken();
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.store
      .select('user')
      .subscribe(({ user }) => (this.nombre = user.name));
  }

  logout() {
    localStorage.clear();
    this.identity = '';
    this.token = '';
    this.store.dispatch(authActions.unSetUser());
    this.store.dispatch(ingresoEgresoActions.unSetItems());
    this._router.navigate(['/login']);
  }
}
