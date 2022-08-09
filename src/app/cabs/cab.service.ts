import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

import { environment } from '../../environments/environment';
import { Cab } from '../models/cab.module';
import { ErrorsHandlingService } from '../shared/services/errors-handling.service';

@Injectable({
  providedIn: 'root'
})
export class CabService {

  constructor(private httpClient: HttpClient,
              private errorHandlingService: ErrorsHandlingService) { }

  getCabs() {
    return this.httpClient.get<Cab[]>(environment.url + '/cab')
      .pipe(catchError(this.errorHandlingService.handleError));
  }

  addCab(cab: any) {
    return this.httpClient.post(environment.url + '/cab', cab)
      .pipe(catchError(this.errorHandlingService.handleError));
  }

  editCab(cab: Cab) {
    return this.httpClient.put<Cab>(environment.url + '/cab/' + cab.id, cab)
      .pipe(catchError(this.errorHandlingService.handleError));
  }

  deleteCab(id: string) {
    return this.httpClient.delete(environment.url + '/cab/' + id)
      .pipe(catchError(this.errorHandlingService.handleError));
  }
}
