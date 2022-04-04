import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './services/auth.guard';
import { NoIdentityGuard } from './services/no-identity.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NoIdentityGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NoIdentityGuard],
  },
  {
    path: '',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./ingreso-egreso/ingreso-egreso.module').then(
        (m) => m.IngresoEgresoModule
      ),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
