import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { MockUserService } from '../shared/mock-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private mockUserService: MockUserService) {
  }

  signin(username: string, password: string): Observable<any> {
    return this.mockUserService.signin(username, password).pipe(map((user: any) => {
      if (user.token) {
        this.mockUserService.setToken(user.token);
      }
    }), catchError(this.handleError));
  }

  private handleError(errorRes: any) {
    let errorMessage = 'An unknown error occurred!';
    switch(errorRes) {
      case 'INVALID_PASSWORD_OR_EMAIL':
      errorMessage = 'Username or password is incorrect.';
      break;
    }
    return throwError(() => new Error(errorMessage));
  }

  signout(): Observable<any> {
    return this.mockUserService.signout().pipe(map(() => {
      this.mockUserService.removeToken();
    }));
  }
}
