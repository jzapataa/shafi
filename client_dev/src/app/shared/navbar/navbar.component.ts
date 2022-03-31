import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Global } from 'src/app/services/Global';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent implements OnInit {
  public identity: any;
  public token;
  public url;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.identity = this._authService.getIdentity();
    this.token = this._authService.getToken();
    this.url = Global.url;
  }

  ngOnInit(): void {}
}
