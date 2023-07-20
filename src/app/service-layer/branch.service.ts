import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user/auth-user.model';
import { environment } from '../../environments/environment';
import { Role } from '../models/roles/roles.model';
import { Branch } from '../models/branches/branch.model';

const httpOptions = {
  headers: environment.headers
};

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  constructor(private http: HttpClient) { }

  create(data: Branch): Observable<Branch | any> {
    return this.http.post(environment.apiUrl + '/branches', JSON.stringify(data), httpOptions)
  }

  update(data: Branch): Observable<Branch | any> {
    return this.http.patch(environment.apiUrl + `/branches/${data.id}`, JSON.stringify(data), httpOptions)
  }

  getAll(): Observable<any> {
    return this.http.get(environment.apiUrl + '/branches/all', { responseType: 'json' });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(environment.apiUrl + `/branches/${id} `, httpOptions);
  }
}
