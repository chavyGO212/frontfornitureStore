import { Component, inject, OnInit } from '@angular/core';
import { RegistrationService } from './register.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {
  subscription = new Subscription();
  readonly registerService = inject(RegistrationService);
  registrationForm: FormGroup;
  constructor(private fb: FormBuilder, private registrationService: RegistrationService) {
  }
  ngOnInit(): void {
    this.buildForm();
  }
  buildForm(){
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone: ['', Validators.required]
    });
    console.log(this.registrationForm.value);
  
  }
  // פונקציה להירשם שתבוצע בלחיצה על הכפתור
  register() {
    console.log('Customer registered:', this.registrationForm.value);
    this.subscription.add(this.registerService.register(this.registrationForm.value).subscribe(response => {
      console.log('Registration successful', response);
    }, error => {
      console.error('Registration failed', error);
    })
  )
  }

}
