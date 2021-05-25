import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  RatesApiURL: 'https://api.ratesapi.io/api';

  constructor(private http: HttpClient) {
  }

  getPosts_2(): Observable<Array<any>> {
    const url = this.RatesApiURL + '/lastest';
    return this.http.get<Array<any>>(url);
  }
}
