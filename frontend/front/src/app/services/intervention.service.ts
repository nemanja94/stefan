import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterventionService {

  url = 'http://localhost:3000/api/intervention';

  constructor(private http: HttpClient) { }

  getCarsByOwner(clientID): Observable<any> {
    return this.http.post(`${this.url}/getCarsByOwner`, { clientID });
  }

  getInterventionsByCarId(carId): Observable<any> {
  	return this.http.post(`${this.url}/getInterventionsByCarId`, { carId: carId });
  }
}
