import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const AUTH_API = environment.apiUrl

const httpOptions = {
  headers: environment.headers
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
