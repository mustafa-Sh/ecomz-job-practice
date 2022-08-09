import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public passwordHide = true;
  isLoading = false;
  error: string = '';
  signinSubscription: Subscription;
  captcha: string = '';
  siteKey = environment.recaptchaKey;

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

  resolved(captchaResponse: string): void {
    this.captcha = captchaResponse;
  }

  submit() {
    this.error = '';
    this.isLoading = true;
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;
    this.signinSubscription = this.authService.signin(username, password)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.error = '';
          this.router.navigate(['/']);
        },
        error: (errorMessage) => {
          this.error = errorMessage;
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
