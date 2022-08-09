import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorsHandlingService {

  constructor() { }

  public handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes);
    let errorMessage = 'An unknown error occured!';
    if (!errorRes || !errorRes.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorRes.error) {
      case 'Not found':
        errorMessage = 'url is wrong.';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }
}
