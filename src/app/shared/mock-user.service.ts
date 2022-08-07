import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { USER } from '../models/user.mocks';

@Injectable({
  providedIn: 'root'
})
// this service contains mock data that should be removed
export class MockUserService {

  constructor() { }

  signin(username: string, password: string) {
    const myObservable = new Observable((observer) => {
      setTimeout(async () => {
        if (username === USER.username && password === USER.password) {
          const token = this.makejwt();
          observer.next({
            token
          });
          observer.complete();
        } else {
          observer.error('Username or password is incorrect');
          observer.complete();
        }
      }, 2000);
    });
    return myObservable;
  }

  makejwt(): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i=0; i<20; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  signout() {
    const myObservable = new Observable((observer) => {
      setTimeout(() => {
        observer.next();
        observer.complete();
      }, 2000);
    });
    return myObservable;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
