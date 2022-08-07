import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SigninComponent } from './signin/signin.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    SigninComponent
  ],
  imports: [
    FormsModule,
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule {}
