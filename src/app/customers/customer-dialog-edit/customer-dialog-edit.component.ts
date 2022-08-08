import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Customer } from '../../models/customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-dialog-edit',
  templateUrl: './customer-dialog-edit.component.html',
  styleUrls: ['./customer-dialog-edit.component.scss']
})
export class CustomerDialogEditComponent implements OnInit {
  public form: FormGroup;
  isLoading = false;
  customer: any;

  constructor(public dialogRef: MatDialogRef<CustomerDialogEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder,
              private customerService: CustomerService) {
    this.customer = data;
    this.form = this.fb.group({
      name: [this.customer.name, Validators.required],
      country: [this.customer.country, Validators.required],
      city: [this.customer.city, Validators.required],
      street: [this.customer.street, Validators.required]
    });
  }

  ngOnInit(): void {

  }

  submit() {
    const customer: Customer = {
      id: this.customer.id,
      name: this.form.get('name')?.value,
      address: {
        country: this.form.get('country')?.value,
        city: this.form.get('city')?.value,
        street: this.form.get('street')?.value
      }
    }
    this.isLoading = true;
    this.customerService.editCustomer(customer).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.close(customer);
      },
      error: (err) => {
        console.log('err', err);
        this.isLoading = false;
      }
    });
  }

  close(data: any): void {
    this.dialogRef.close(data);
  }

}
