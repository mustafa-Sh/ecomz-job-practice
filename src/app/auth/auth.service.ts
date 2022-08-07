import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MockUserService } from '../shared/mock-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private mockUserService: MockUserService) { }

  signin(username: string, password: string): Observable<any> {
    return this.mockUserService.signin(username, password).pipe(map((res: any) => {
      this.mockUserService.setToken(res.token);
    }));
  }

  signout(): Observable<any> {
    return this.mockUserService.signout().pipe(map(() => {
      this.mockUserService.removeToken();
    }));
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}
