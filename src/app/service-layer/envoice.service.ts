import { Envoice } from './../models/envoice.model';
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
export class EnvoiceService {
    constructor(private http: HttpClient) { }

    create(data: Envoice): Observable<Envoice | any> {
        return this.http.post(environment.apiUrl + '/invoice', JSON.stringify(data), httpOptions)
    }

    update(data: Envoice): Observable<Envoice | any> {
        return this.http.patch(environment.apiUrl + `/invoice/${data.id}`, JSON.stringify(data), httpOptions)
    }

    getAll(): Observable<any> {
        return this.http.get(environment.apiUrl + '/invoice', { responseType: 'json' });
    }

    delete(id: string): Observable<any> {
        return this.http.delete(environment.apiUrl + `/invoice/${id}`, httpOptions);
    }
    send(id: string): Observable<any> {
        return this.http.get(environment.apiUrl + `/integrationng/submit/${id}`, { responseType: 'json' });
    }
}
