import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Cab } from '../models/cab.module';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private httpClient: HttpClient) { }

  getCustomers() {
    return this.httpClient.get<Customer[]>(environment.url + '/customer');
  }

  getCabs() {
    return this.httpClient.get<Cab[]>(environment.url + '/cab');
  }
}
