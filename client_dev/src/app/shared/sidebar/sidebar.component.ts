import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { Global } from 'src/app/services/Global';
import * as authActions from '../../auth/auth.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  public identity;
  public token;
  public url;

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

  ngOnInit(): void {}

  logout() {
    localStorage.clear();
    this.identity = '';
    this.token = '';
    this.store.dispatch(authActions.unSetUser());
    this._router.navigate(['/login']);
  }
}
