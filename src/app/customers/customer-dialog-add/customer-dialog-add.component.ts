import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-dialog-add',
  templateUrl: './customer-dialog-add.component.html',
  styleUrls: ['./customer-dialog-add.component.scss']
})
export class CustomerDialogAddComponent implements OnInit {
  public form: FormGroup;
  isLoading = false;

  constructor(public dialogRef: MatDialogRef<CustomerDialogAddComponent>,
              public fb: FormBuilder,
              private customerService: CustomerService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  submit() {
    const customer = {
      name: this.form.get('name')?.value,
      address: {
        country: this.form.get('country')?.value,
        city: this.form.get('city')?.value,
        street: this.form.get('street')?.value
      }
    }
    this.isLoading = true;
    this.customerService.addCustomer(customer).subscribe({
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
