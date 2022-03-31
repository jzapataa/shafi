import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string = '';
  public message: string = '';

  constructor(private _authService: AuthService) {
    this.page_title = 'Registro';
    this.user = new User('', '', '', '', '', '', '');
  }

  ngOnInit(): void {}

  onSubmit(form: any) {
    console.log(form);
    this._authService.register(this.user).subscribe(
      (response) => {
        if (response.user) {
          this.status = 'success';
          form.reset();
        } else {
          this.status = 'error';
          this.message = response.message;
        }
      },
      (error) => {
        this.status = 'error';
        this.message = error;
      }
    );
  }
}
