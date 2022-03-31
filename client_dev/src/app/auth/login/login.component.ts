import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string = '';
  public identity: any;
  public token: string = '';

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Ingresar';
    this.user = new User('', '', '', '', '', '', '');
  }

  ngOnInit(): void {}

  onSubmit(form: any) {
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
                this._router.navigate(['/inicio']);
              } else {
                this.status = 'error';
              }
            },
            (error) => {
              this.status = 'error';
            }
          );
        } else {
          this.status = 'error';
        }
      },
      (error) => {
        this.status = 'error';
      }
    );
  }
}
