import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: environment.headers
};

@Injectable({
  providedIn: 'root',
})
export class StaticService {
  constructor(private http: HttpClient) { }

  getActivity(): Observable<any> {
    return this.http.get(environment.apiUrl + '/static/activities', { responseType: 'json' });
  }

  getGpcCodes(name: string): Observable<any> {
    return this.http.get(environment.apiUrl + `/static/gpc?name=${name}`, { responseType: 'json' });
  }

  getUnits(): Observable<any> {
    return this.http.get(environment.apiUrl + `/static/units`, { responseType: 'json' });
  }
  getTaxs(): Observable<any> {
    return this.http.get(environment.apiUrl + `/static/taxes`, { responseType: 'json' });
  }
}
