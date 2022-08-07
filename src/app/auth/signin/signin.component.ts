import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public passwordHide = true;
  isLoading = false;
  signinSubscription: Subscription;

  constructor(public fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnInit(): void {
  }

  submit() {
    this.isLoading = true;
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;
    this.signinSubscription = this.authService.signin(username, password)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.signinSubscription) {
      this.signinSubscription.unsubscribe();
    }
  }

}
