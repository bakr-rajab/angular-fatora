import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user/auth-user.model';

const API_URL = 'http://localhost:4000';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  createUser(data: User): Observable<User | any> {
    return this.http.post(API_URL + '/users', JSON.stringify(data), httpOptions)
  }

  getUsers(): Observable<any> {
    return this.http.get(API_URL + '/users/all', { responseType: 'json' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'json' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}
