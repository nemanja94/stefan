import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Client } from 'src/app/models/Client.model';
import { UserService } from 'src/app/services/user.service';
import { Car } from 'src/app/models/Car.model';
import { Intervention } from 'src/app/models/Intervention.model';
import { CarService } from 'src/app/services/car.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  client = new Client();
  cars: Car[] = [];
  interventions = new Intervention();

  updateFormClient: FormGroup;
  updateFormCar: FormGroup;
  updateFormIntervention: FormGroup;

  clientId: string;

  constructor(
    private userService: UserService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) {

    this.activatedRoute.params.subscribe(res => this.clientId = res.id);

    this.updateFormClient = this.fb.group({
      id: [this.clientId],
      firstName: [],
      lastName: [],
      idNumber: []
    });

    this.updateFormCar = this.fb.group({
      clientID: [],
      maker: [],
      model: [],
      manufactYear: [],
      regNumber: [],
      engineNumber: [],
      chasiesNumber: [],
      description: []
    });

    this.updateFormIntervention = this.fb.group({

    });
  }

  ngOnInit(): void {
    this.userService.getOneClient(this.clientId).subscribe(res => {
      this.client.firstName = res.firstName;
      this.client.lastName = res.lastName;
      this.client.idNumber = res.idNumber;
    });

    this.carService.getCarsByOwner(this.clientId).subscribe(res => this.cars = res);
  }

  onUpdateClient(): void {
    this.userService.update(this.updateFormClient.getRawValue()).subscribe((res) => {
      if (res) {
        console.log(res);
      } else {
        console.log('Nece da radi');
      }
    });
  }

  onUpdateCar(): void {

  }

  onUpdateIntervention(): void {

  }


}
