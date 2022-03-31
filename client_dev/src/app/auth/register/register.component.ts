import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public page_title: string;
  public user: User;
  public status: string = '';
  public message: string = '';
  public cargando: boolean = false;
  public uiSubscription!: Subscription;

  constructor(
    private _authService: AuthService,
    private store: Store<AppState>
  ) {
    this.page_title = 'Registro';
    this.user = new User('', '', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.uiSubscription = this.store
      .select('ui')
      .subscribe((ui) => (this.cargando = ui.isLoading));
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  onSubmit(form: any) {
    this.store.dispatch(ui.isLoading());
    this._authService.register(this.user).subscribe(
      (response) => {
        if (response.user) {
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
        this.store.dispatch(ui.stopLoading());
        this.status = 'error';
        this.message = error;
      }
    );
  }
}
