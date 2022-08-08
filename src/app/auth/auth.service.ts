import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

import { MockUserService } from '../shared/mock-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject(null);

  constructor(private mockUserService: MockUserService) { }

  signin(username: string, password: string): Observable<any> {
    return this.mockUserService.signin(username, password).pipe(map((user: any) => {
      if (user.token) {
        this.mockUserService.setToken(user.token);
        this.user.next(user);
      }
    }));
  }

  signout(): Observable<any> {
    return this.mockUserService.signout().pipe(map(() => {
      this.mockUserService.removeToken();
      this.user.next(null);
    }));
  }
}
