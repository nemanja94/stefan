import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/Car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  url = 'http://localhost:3000/api/car';
  car = new Car();

  constructor(private http: HttpClient) { }

  getCarsByOwner(clientID): Observable<any> {
    return this.http.post(`${this.url}/getCarsByOwner`, { clientID });
  }

  getOneCar(carId): Observable<any> {
    return this.http.post(`${this.url}/getOne`, { id: carId });
  }

  // getClientsByName(firstname): Observable<any> {
  //   return this.http.post(`${this.url}/getClientsByName`, { firstName: firstname });
  // }

  update(car): Observable<any> {
    return this.http.put(this.url + '/updateOne', {
      maker: car.maker,
      model: car.model,
      manufactYear: car.manufactYear,
      regNumber: car.regNumber,
      engineNumber: car.engineNumber,
      chasiesNumber: car.chasiesNumber,
      description: car.description
    });
  }
}
