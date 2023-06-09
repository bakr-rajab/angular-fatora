import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:4000';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }
  // taxNumber!: number;
  // password!: string;

  login(body: any): Observable<any> {
    return this.http.post(
      AUTH_API + '/auth/login',
      JSON.stringify(body),
      httpOptions
    );
  }
}
