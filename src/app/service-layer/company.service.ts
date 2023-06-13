import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company/company.model';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: environment.headers
};

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  createCompany(data: Company): Observable<Company | any> {
    return this.http.post(environment.apiUrl + '/companys', JSON.stringify(data), httpOptions)
  }

  getAll(): Observable<any> {
    return this.http.get(environment.apiUrl + '/companys/all', { responseType: 'json' });
  }
  deleteCompany(id: string): Observable<any> {
    return this.http.delete(environment.apiUrl + `/companys/${id} `, httpOptions);
  }
}
