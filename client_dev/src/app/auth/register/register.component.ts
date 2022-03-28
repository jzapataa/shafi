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
  constructor(private _authService: AuthService) {
    this.page_title = 'Registro';
    this.user = new User('', '', '', '', '', '');
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.user);
  }
}
