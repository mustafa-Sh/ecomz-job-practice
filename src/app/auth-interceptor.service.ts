import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { exhaustMap, take } from 'rxjs';

import { MockUserService } from './shared/mock-user.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private mockUserService: MockUserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.mockUserService.getToken();
    if (!token) {
      return next.handle(req);
    } else {
      const modifiedRequest = req.clone({params: new HttpParams().set('auth', token)});
      return next.handle(modifiedRequest);
    }
  }

}
