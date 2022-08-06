import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatProgressBarModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    FlexLayoutModule,
    MatSortModule,
    MatInputModule
  ],
  declarations: [
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatProgressBarModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    FlexLayoutModule,
    MatSortModule,
    MatInputModule
  ]
})
export class SharedModule {}
