import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
@Injectable({
  providedIn: 'root'
})
export class GenericService {
  constructor(private httpClient: HttpClient) { }

  restServiceCall(body: any) {
    console.log({ body });
    // return this.httpClient.post('http://backend.fatuora.com/api/inbound', JSON.stringify(body), {headers: headers});
    //return this.httpClient.post('http://23.97.144.112:5400/api/inbound', JSON.stringify(body), {headers: headers});
    return this.httpClient.post('http://192.168.1.7:4000/auth/login', JSON.stringify(body), { headers: headers });
    //return this.httpClient.post('/api/inbound', JSON.stringify(body), {headers: headers});

    //return this.httpClient.post('/api/inbound', JSON.stringify(body), {headers: headers});
  }
}
