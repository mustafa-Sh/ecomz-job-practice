import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  title = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data ? data.title : '';
  }

  ngOnInit(): void {
  }

}
