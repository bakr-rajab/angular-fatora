import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company/company.model';
import { Observable } from 'rxjs';
import { License } from '../models/license/license.model';

const httpOptions = {
  headers: environment.headers
};

@Injectable({
  providedIn: 'root'
})
export class LicenseService {

  constructor(private http: HttpClient) { }

  create(data: License): Observable<License | any> {
    return this.http.post(environment.apiUrl + '/license', JSON.stringify(data), httpOptions)
  }

  getAll(): Observable<any> {
    return this.http.get(environment.apiUrl + '/license/all', { responseType: 'json' });
  }
  deleteOne(id: string): Observable<any> {
    return this.http.delete(environment.apiUrl + `/license/${id} `, httpOptions);
  }
  submitDocument(id: string): Observable<any> {
    return this.http.get(environment.apiUrl + `/license/submit/${id} `, httpOptions);
  }
}
