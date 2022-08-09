import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Cab } from '../../models/cab.module';
import { CabService } from '../cab.service';

@Component({
  selector: 'app-cabs-dialog-edit',
  templateUrl: './cabs-dialog-edit.component.html',
  styleUrls: ['./cabs-dialog-edit.component.scss']
})
export class CabsDialogEditComponent implements OnInit {
  public form: FormGroup;
  isLoading = false;
  cab: Cab;

  constructor(public dialogRef: MatDialogRef<CabsDialogEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder,
              public snackBar: MatSnackBar,
              private cabService: CabService) {
    this.cab = data;
    this.form = this.fb.group({
      owner: [this.cab.owner, Validators.required],
      model: [this.cab.model, Validators.required],
      number: [this.cab.number, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  submit() {
    const cab: Cab = {
      id: this.cab.id,
      owner: this.form.get('owner')?.value,
      model: this.form.get('model')?.value,
      number: this.form.get('number')?.value,
    }
    this.isLoading = true;
    this.cabService.editCab(cab).subscribe({
      next: () => {
        this.isLoading = false;
        this.close(cab);
      },
      error: (err) => {
        this.snackBar.open(err);
        this.isLoading = false;
      }
    });
  }

  close(data: any): void {
    this.dialogRef.close(data);
  }
}
