import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
//import { AuthService } from './auth.service';  // נניח שיש לך שירות לביצוע אימות


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit{
  
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.buildForm();
  }
  buildForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    console.log(this.loginForm.value);
  
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        response => {
          if (response.success) {
            this.router.navigate(['/personal-log-in']);  // נניח שזה הנתיב לאזור האישי
          } else {
            // טיפול במקרה של כשל בכניסה
            console.error('Login failed');
          }
        },
        error => {
          console.error('Error occurred during login', error);
        }
      );
    } else {
      console.error('Form is not valid');
    }
  }
}
