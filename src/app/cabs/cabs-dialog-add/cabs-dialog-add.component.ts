import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CabService } from '../cab.service';

@Component({
  selector: 'app-cabs-dialog-add',
  templateUrl: './cabs-dialog-add.component.html',
  styleUrls: ['./cabs-dialog-add.component.scss']
})
export class CabsDialogAddComponent implements OnInit {
  public form: FormGroup;
  isLoading = false;

  constructor(public dialogRef: MatDialogRef<CabsDialogAddComponent>,
              public fb: FormBuilder,
              public snackBar: MatSnackBar,
              private cabService: CabService) {
    this.form = this.fb.group({
      owner: ['', Validators.required],
      model: ['', Validators.required],
      number: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  submit() {
    const cab = {
      owner: this.form.get('owner')?.value,
      model: this.form.get('model')?.value,
      number: this.form.get('number')?.value
    }
    this.isLoading = true;
    this.cabService.addCab(cab).subscribe({
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
