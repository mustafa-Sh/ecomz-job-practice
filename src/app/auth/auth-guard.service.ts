import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';

import { MockUserService } from '../shared/mock-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private mockUserService: MockUserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    const token = this.mockUserService.getToken();
    if (token) {
      return true;
    } else {
      this.router.navigate(['/signin']);
      return false;
    }
  }
}
