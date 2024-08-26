import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrationService } from '../register/register.service';
import { AuthService } from '../log-in/auth.service'; 
import { Router } from '@angular/router';



@Component({
  selector: 'app-personal-log-in',
  templateUrl: './personal-log-in.component.html',
  styleUrls: ['./personal-log-in.component.css']
})
export class PersonalLogInComponent implements OnInit  {
  user: any; // User details object

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Retrieve user data from localStorage
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.user);

    if (!this.user) {
      // If user data is not found, navigate to the login page
      this.router.navigate(['/log-in']);
    }
  }

  logout(): void {
    this.authService.logout(); // Call the logout method in AuthService
    this.router.navigate(['/log-in']); // Navigate to the login page after logging out
  }
}






  



