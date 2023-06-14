import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user/auth-user.model';
import { environment } from '../../environments/environment';
import { Role } from '../models/roles/roles.model';

console.log(environment.apiUrl);

const httpOptions = {
  headers: environment.headers
};

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) { }

  createRole(data: Role): Observable<Role | any> {
    return this.http.post(environment.apiUrl + '/roles', JSON.stringify(data), httpOptions)
  }

  getRoles(): Observable<any> {
    return this.http.get(environment.apiUrl + '/roles/all', { responseType: 'json' });
  }

  deleteRole(id: string): Observable<any> {
    return this.http.delete(environment.apiUrl + `/roles/${id} `, httpOptions);
  }
}
