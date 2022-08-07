import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoading = false;
  signoutSubscription: Subscription;

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  nagigateToCustomers() {
    this.router.navigate(['/']);
  }

  nagigateToCabs() {
    this.router.navigate(['/cabs']);
  }

  signout(): void {
    this.isLoading = true;
    this.signoutSubscription = this.authService.signout()
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/signin']);
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.signoutSubscription) {
      this.signoutSubscription.unsubscribe();
    }
  }

}
