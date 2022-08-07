import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CustomersComponent } from './customers.component';
import { CustomerDialogAddComponent } from './customer-dialog-add/customer-dialog-add.component';
import { CustomerDialogEditComponent } from './customer-dialog-edit/customer-dialog-edit.component';

export const routes: Routes = [
  { path: '', component: CustomersComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    CustomersComponent,
    CustomerDialogAddComponent,
    CustomerDialogEditComponent
  ]
})
export class CustomersModule { }
