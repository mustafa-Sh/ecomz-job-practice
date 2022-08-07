import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CabsComponent } from './cabs.component';
import { CabsDialogAddComponent } from './cabs-dialog-add/cabs-dialog-add.component';
import { CabsDialogEditComponent } from './cabs-dialog-edit/cabs-dialog-edit.component';

export const routes: Routes = [
  { path: '', component: CabsComponent, pathMatch: 'full' }
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
    CabsComponent,
    CabsDialogAddComponent,
    CabsDialogEditComponent
  ]
})
export class CabsModule { }
