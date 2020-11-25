import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Client } from 'src/app/models/Client.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  clients: Client[] = [];
  id: string;

  addFormClient: FormGroup;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
    this.addFormClient = this.fb.group({
      firstName: [],
      lastName: [],
      idNumber: []
    });
  }

  ngOnInit(): void {
  }

  findClientsByName(firstname: HTMLInputElement): any {
    this.userService.getClientsByName(firstname).subscribe(res => {
      this.clients = res;
    });
  }

  editClient(id): void {
    this.router.navigate(['profile', id]);
  }
}
