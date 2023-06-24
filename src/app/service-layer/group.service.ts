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
export class GroupService {
    constructor(private http: HttpClient) { }

    create(data: Group): Observable<Group | any> {
        return this.http.post(environment.apiUrl + '/group', JSON.stringify(data), httpOptions)
    }

    getAll(): Observable<any> {
        return this.http.get(environment.apiUrl + '/group/all', { responseType: 'json' });
    }

    delete(id: string): Observable<any> {
        return this.http.delete(environment.apiUrl + `/group/${id} `, httpOptions);
    }
}
