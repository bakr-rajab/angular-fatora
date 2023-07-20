import { Item } from './../models/item.model';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user/auth-user.model';
import { environment } from '../../environments/environment';
import { Role } from '../models/roles/roles.model';
import { Group } from '../models/group.model';

const httpOptions = {
    headers: environment.headers
};

@Injectable({
    providedIn: 'root',
})
export class ItemService {
    constructor(private http: HttpClient) { }

    create(data: Item): Observable<Item | any> {
        return this.http.post(environment.apiUrl + '/item', JSON.stringify(data), httpOptions)
    }

    update(data: Item): Observable<Item | any> {
        return this.http.patch(environment.apiUrl + `/item/${data.id}`, JSON.stringify(data), httpOptions)
    }

    getAll(): Observable<any> {
        return this.http.get(environment.apiUrl + '/item/all', { responseType: 'json' });
    }

    delete(id: string): Observable<any> {
        return this.http.delete(environment.apiUrl + `/item/${id}`, httpOptions);
    }
}
