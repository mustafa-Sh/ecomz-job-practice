import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LOGINREQUEST } from '../mocks/loginRequest.mocks';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
// this service contains mock data that should be removed
export class MockUserService {

  constructor() { }

  signin(username: string, password: string) {
    const myObservable = new Observable((observer) => {
      setTimeout(async () => {
        if (username === LOGINREQUEST.username && password === LOGINREQUEST.password) {
          const token = this.makejwt();
          const user = new User('91c4abfc699c3', username, 'mustafa@gmail.com', token);
          observer.next({
            ...user
          });
          observer.complete();
        } else {
          observer.error('INVALID_PASSWORD_OR_EMAIL');
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

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
