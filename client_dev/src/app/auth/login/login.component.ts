import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../app.reducer';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  public page_title: string;
  public user: User;
  public status: string = '';
  public identity: any;
  public token: string = '';
  public cargando: boolean = false;
  public uiSubscription!: Subscription;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.page_title = 'Ingresar';
    this.user = new User('', '', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe((ui) => {
      this.cargando = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  onSubmit(form: any) {
    this.store.dispatch(ui.isLoading());

    this._authService.login(this.user).subscribe(
      (response) => {
        if (response.user && response.user._id) {
          this.identity = response.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));

          this._authService.login(this.user, true).subscribe(
            (response) => {
              if (response.token) {
                this.token = response.token;
                localStorage.setItem('token', this.token);
                this.status = 'success';
                this.store.dispatch(ui.stopLoading());
                this._router.navigate(['/inicio']);
              } else {
                this.store.dispatch(ui.stopLoading());
                this.status = 'error';
              }
            },
            (error) => {
              this.store.dispatch(ui.stopLoading());
              this.status = 'error';
            }
          );
        } else {
          this.store.dispatch(ui.stopLoading());
          this.status = 'error';
        }
      },
      (error) => {
        this.store.dispatch(ui.stopLoading());
        this.status = 'error';
      }
    );
  }
}
