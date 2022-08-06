import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  public displayedColumns = ['name', 'country', 'city', 'street', 'id'];
  dataSource = new MatTableDataSource();
  isLoading = false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private dataStorage: DataStorageService) {

  }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadData();
  }

  loadData(): void {
    this.dataSource.paginator = this.paginator;
    this.dataStorage.getCustomers().subscribe({
      next: (result) => {
        console.log(result);
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
