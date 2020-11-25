import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/Client.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:3000/api/client';
  client = new Client();

  constructor(private http: HttpClient) { }

  getClients(): Observable<any> {
    return this.http.get(this.url);
  }

  getOneClient(clientId): Observable<any> {
    return this.http.post(`${this.url}/getOne`, { id: clientId });
  }

  getClientsByName(firstname): Observable<any> {
    return this.http.post(`${this.url}/getClientsByName`, { firstName: firstname });
  }

  update(user): Observable<any> {
    return this.http.put(this.url + '/updateOne', {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      idNumber: user.idNumber
    });
  }
}
