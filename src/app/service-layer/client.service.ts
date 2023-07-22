import { Client } from './../models/client.model';
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
export class ClientService {
    constructor(private http: HttpClient) { }

    create(data: Client): Observable<Client | any> {
        return this.http.post(environment.apiUrl + '/client', JSON.stringify(data), httpOptions)
    }

    update(data: Client): Observable<Client | any> {
        return this.http.patch(environment.apiUrl + `/client/${data.id}`, JSON.stringify(data), httpOptions)
    }

    getAll(): Observable<any> {
        return this.http.get(environment.apiUrl + '/client/all', { responseType: 'json' });
    }

    delete(id: string): Observable<any> {
        return this.http.delete(environment.apiUrl + `/client/${id}`, httpOptions);
    }
}
