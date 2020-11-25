import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private userService: UserService, private router: Router) { }

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
