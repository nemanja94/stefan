import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-popup-car-update',
  templateUrl: './popup-car-update.component.html',
  styleUrls: ['./popup-car-update.component.css']
})
export class PopupCarUpdateComponent implements OnInit {

  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  show(){
    this.showModal = true; // Show-Hide Modal Check
  }

  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
	        email: ['', [Validators.required, Validators.email]],
	        password: ['', [Validators.required, Validators.minLength(6)]],
	        firstname: ['', [Validators.required, Validators.minLength(6)]],
	        mobile: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(10)]]
    	});
	}
// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; }
onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    if(this.submitted)
    {
      this.showModal = false;
    }
   
}

}