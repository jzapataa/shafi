import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoIdentityGuard implements CanActivate {
  public identity: any;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService
  ) {
    this.identity = this._authService.getIdentity();
  }
  canActivate() {
    if (this.identity && this.identity.email) {
      this._router.navigate(['/inicio']);
      return false;
    } else {
      return true;
    }
  }
}
