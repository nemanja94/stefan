import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: [],
      email: [],
      password: []
    });
  }

  onRegisterSubmit(): void {
    this.authService.register(this.registerForm.getRawValue()).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err.error.message);
      }
    );
  }
}
