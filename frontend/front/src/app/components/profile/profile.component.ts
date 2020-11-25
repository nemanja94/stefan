import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

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

    this.updateFormClient = this.fb.group({
      id: [],
      firstName: [],
      lastName: [],
      idNumber: []
    });

    this.activatedRoute.params.subscribe((res) => {
      this.clientId = res.id;

      this.userService.getOneClient(this.clientId).subscribe(result => {
        // this.client.id = this.clientId;
        // this.client.firstName = result.firstName;
        // this.client.lastName = result.lastName;
        // this.client.idNumber = result.idNumber;

        this.updateFormClient.get('id').patchValue(this.clientId);
        this.updateFormClient.get('firstName').patchValue(result.firstName);
        this.updateFormClient.get('lastName').patchValue(result.lastName);
        this.updateFormClient.get('idNumber').patchValue(result.idNumber);
      });
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
