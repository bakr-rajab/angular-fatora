import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user/auth-user.model';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const httpOptions = {
  headers: environment.headers
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  createUser(data: User): Observable<User | any> {
    return this.http.post(API_URL + '/users', JSON.stringify(data), httpOptions)
  }

  getAllUsers(): Observable<any> {
    return this.http.get(API_URL + '/users/all', { responseType: 'json' });
  }

  getUser(_id: string): Observable<any> {
    return this.http.get(API_URL + '/users/${id}', { responseType: 'json' });
  }

  updateUser(id: string, value: User): Observable<any> {
    return this.http.put(API_URL + `/users/${id} `, value)
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(environment.apiUrl + `/users/${id} `, httpOptions);
  }

  // updateUser(id : number, value : any) : Observable<object>{
  //return this.http.put(API_URL )

  // }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'json' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}
