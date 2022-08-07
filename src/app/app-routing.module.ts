import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth-guard.service';

const appRoutes: Routes = [
  { path: '', canActivate: [AuthGuard], loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)},
  { path: 'cabs', canActivate: [AuthGuard], loadChildren: () => import('./cabs/cabs.module').then(m => m.CabsModule)},
  { path: 'signin', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
