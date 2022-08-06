import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { DataStorageService } from '../shared/data-storage.service';


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

  constructor(private dataStorage: DataStorageService) { }

  ngOnInit(): void {
    this.sort.sort(({ id: 'owner', start: 'asc'}) as MatSortable);
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataStorage.getCabs().subscribe({
      next: (result) => {
        this.dataSource.data = result;
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

}
