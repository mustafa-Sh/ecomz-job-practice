import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { MockUserService } from '../shared/services/mock-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoading = false;
  signoutSubscription: Subscription;
  private authSub: Subscription;
  isAuthenticated = false;

  constructor(private router: Router,
              private authService: AuthService,
              private mockUserService: MockUserService) { }

  ngOnInit(): void {
    this.authSub = this.authService.isAuthenticated.subscribe(response => {
      this.isAuthenticated = !response ? false : true;
    });
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
          this.router.navigate(['/auth']);
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
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

}
