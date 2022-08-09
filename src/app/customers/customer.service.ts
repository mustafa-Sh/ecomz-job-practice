import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

import { environment } from '../../environments/environment';
import { Customer } from '../models/customer.model';
import { ErrorsHandlingService } from '../shared/errors-handling.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient,
              private errorHandlingService: ErrorsHandlingService) { }

  getCustomers() {
    return this.httpClient.get<Customer[]>(environment.url + '/customer')
      .pipe(catchError(this.errorHandlingService.handleError));
  }

  addCustomer(customer: any) {
    return this.httpClient.post(environment.url + '/customer', customer)
      .pipe(catchError(this.errorHandlingService.handleError));
  }

  editCustomer(customer: Customer) {
    return this.httpClient.put<Customer>(environment.url + '/customer/' + customer.id, customer)
      .pipe(catchError(this.errorHandlingService.handleError));
  }

  deleteCustomer(id: string) {
    return this.httpClient.delete(environment.url + '/customer/' + id)
      .pipe(catchError(this.errorHandlingService.handleError));
  }
}
