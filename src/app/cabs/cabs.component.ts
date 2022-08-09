import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CabsDialogAddComponent } from './cabs-dialog-add/cabs-dialog-add.component';
import { Cab } from '../models/cab.module';
import { CabsDialogEditComponent } from './cabs-dialog-edit/cabs-dialog-edit.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { CabService } from './cab.service';

@Component({
  selector: 'app-cabs',
  templateUrl: './cabs.component.html',
  styleUrls: ['./cabs.component.scss']
})
export class CabsComponent implements OnInit {
  public displayedColumns = ['owner', 'model', 'number', 'menu'];
  dataSource = new MatTableDataSource();
  isLoading = false;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private cabService: CabService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.sort.sort(({ id: 'owner', start: 'asc'}) as MatSortable);
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.cabService.getCabs().subscribe({
      next: (result) => {
        this.dataSource.data = result;
        this.isLoading = false;
      },
      error: (err) => {
        this.snackBar.open(err);
        this.isLoading = false;
      }
    });
  }

  applyFilter(event: any): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  openAddCab() {
    this.dialog.open(CabsDialogAddComponent, {disableClose: true})
    .afterClosed()
    .subscribe((data) => {
      if (data) {
        this.loadData();
      }
    });
  }

  editCab(element: Cab) {
    this.dialog.open(CabsDialogEditComponent, {
      disableClose: true,
      data: element
    })
    .afterClosed()
    .subscribe((data) => {
      if (data) {
        this.loadData();
      }
    });
  }

  deleteCab(element: Cab) {
    this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      data: {title: 'Are you sure you want to delete this cab?'}
    }).afterClosed()
      .subscribe({
        next: (response) => {
          if (response) {
            this.isLoading = true;
            this.cabService.deleteCab(element.id)
              .subscribe({
                next: (result) => {
                  this.loadData();
                  this.isLoading = false;
                },
                error: (err) => {
                  this.snackBar.open(err);
                  this.isLoading = false;
                }
              });
          }
        }
      })
  }

}
