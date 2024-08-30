import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';

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

  buildForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      alert("נא למלא את כל השדות לפני שמתחברים.");
      return;
  }
    if (this.loginForm.valid) {
        const { email, password } = this.loginForm.value;
        this.authService.login(email, password).subscribe(
            (response: any) => {
                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify(response));
                
                // Clear any existing error message
                this.errorMessage = '';
                
                // Handle successful login and navigate
                this.router.navigate(['/personal-log-in']);
            },
            (error: HttpErrorResponse) => {
                if (error.status === 400) {
                    if (error.error === 'User not found with email: ' + email) {
                        this.errorMessage = 'The email address is not registered. Please sign up first.';
                    } else if (error.error === 'Password is incorrect for this email.') {
                        this.errorMessage = 'The password you entered is incorrect. Please try again.';
                    } else {
                        this.errorMessage = 'An error occurred during login. Please try again.';
                    }
                } else {
                    this.errorMessage = 'An unexpected error occurred. Please try again later.';
                }
                console.error('Error occurred during login', error);
            }
        );
    } else {
        console.error('Form is not valid');
    }
}

}


