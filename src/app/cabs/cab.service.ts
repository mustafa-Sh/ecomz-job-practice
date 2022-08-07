import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Cab } from '../models/cab.module';

@Injectable({
  providedIn: 'root'
})
export class CabService {

  constructor(private httpClient: HttpClient) { }

  getCabs() {
    return this.httpClient.get<Cab[]>(environment.url + '/cab');
  }

  addCab(cab: any) {
    return this.httpClient.post(environment.url + '/cab', cab);
  }

  editCab(cab: Cab) {
    return this.httpClient.put<Cab>(environment.url + '/cab/' + cab.id, cab);
  }

  deleteCab(id: string) {
    return this.httpClient.delete(environment.url + '/cab/' + id);
  }
}
