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
  user: any; 

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
   
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!this.user) {
      this.router.navigate(['/log-in']);
   }
  }

  logout(): void {
    this.authService.userlogout(); 
    this.router.navigate(['/log-in']); 
  }
}






  



