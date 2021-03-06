import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  public identity: any;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService
  ) {
    this.identity = this._authService.getIdentity();
  }

  canLoad() {
    if (this.identity && this.identity.email) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }

  canActivate() {
    if (this.identity && this.identity.email) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
