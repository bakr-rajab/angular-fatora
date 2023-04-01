import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
@Injectable({
  providedIn: 'root'
})
export class GenericService {
  
  constructor(private httpClient: HttpClient) { }

  restServiceCall(body: any){
    console.log({body})
    // return this.httpClient.post('http://backend.fatuora.com/api/inbound', JSON.stringify(body), {headers: headers});
    //return this.httpClient.post('http://23.97.144.112:5400/api/inbound', JSON.stringify(body), {headers: headers});
    return this.httpClient.post('http://127.0.0.1:8000/api/inbound', JSON.stringify(body), {headers: headers});
    //return this.httpClient.post('/api/inbound', JSON.stringify(body), {headers: headers});

    //return this.httpClient.post('/api/inbound', JSON.stringify(body), {headers: headers});

  
  }
}
