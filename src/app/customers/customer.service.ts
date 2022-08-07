import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  getCustomers() {
    return this.httpClient.get<Customer[]>(environment.url + '/customer');
  }

  addCustomer(customer: any) {
    return this.httpClient.post(environment.url + '/customer', customer);
  }

  editCustomer(customer: Customer) {
    return this.httpClient.put<Customer>(environment.url + '/customer/' + customer.id, customer);
  }

  deleteCustomer(id: string) {
    return this.httpClient.delete(environment.url + '/customer/' + id);
  }
}
