import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { CustomerDialogAddComponent } from './customer-dialog-add/customer-dialog-add.component';
import { Customer } from '../models/customer.model';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { CustomerDialogEditComponent } from './customer-dialog-edit/customer-dialog-edit.component';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  public displayedColumns = ['name', 'country', 'city', 'street', 'menu'];
  dataSource = new MatTableDataSource();
  isLoading = false;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private customerService: CustomerService,
              public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.sort.sort(({ id: 'name', start: 'asc'}) as MatSortable);
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.customerService.getCustomers().subscribe({
      next: (result) => {
        this.dataSource.data = result.map(customer => {
          return {
            id: customer.id,
            name: customer.name,
            country: customer.address.country,
            city: customer.address.city,
            street: customer.address.street
          };
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  applyFilter(event: any): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  openAddCustomer() {
    this.dialog.open(CustomerDialogAddComponent, {disableClose: true})
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.loadData();
        }
    });
  }

  editCustomer(element: Customer) {
    this.dialog.open(CustomerDialogEditComponent, {
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

  deleteCustomer(element: Customer) {
    console.log(element)
    this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      data: {title: 'Are you sure you want to delete this customer?'}
    }).afterClosed()
      .subscribe({
        next: (response) => {
          if (response) {
            this.isLoading = true;
            this.customerService.deleteCustomer(element.id)
              .subscribe({
                next: (result) => {
                  console.log(result);
                  this.loadData();
                  this.isLoading = false;
                },
                error: (err) => {
                  console.log(err);
                  this.isLoading = false;
                }
              });
          }
        }
      })
  }

}
