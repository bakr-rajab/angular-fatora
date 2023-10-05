import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Address } from '../models/address.model';

const httpOptions = {
  headers: environment.headers,
};

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}

  create(data: Address): Observable<Address | any> {
    return this.http.post(
      environment.apiUrl + '/address',
      JSON.stringify(data),
      httpOptions
    );
  }

  update(data: Address): Observable<Address | any> {
    return this.http.patch(
      environment.apiUrl + `/address/${data.id}`,
      JSON.stringify(data),
      httpOptions
    );
  }

  getAll(): Observable<any> {
    return this.http.get(environment.apiUrl + '/address/all', {
      responseType: 'json',
    });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(
      environment.apiUrl + `/address/${id} `,
      httpOptions
    );
  }
}
