import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { DataStorageService } from '../shared/data-storage.service';

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

  constructor(private dataStorage: DataStorageService) {

  }

  ngOnInit(): void {
    this.sort.sort(({ id: 'name', start: 'asc'}) as MatSortable);
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataStorage.getCustomers().subscribe({
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

}
