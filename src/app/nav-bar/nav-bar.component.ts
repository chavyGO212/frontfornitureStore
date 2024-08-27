import { Component, OnInit } from '@angular/core';
import { AuthService } from '../log-in/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Subscribe to the user observable to get updates on login state
    this.authService.user.subscribe(user => {
      this.loggedIn = !!user; // Set loggedIn to true if user is not null
    });
  }

  logout(): void {
    this.authService.logout(); // Call the logout method in AuthService
    this.router.navigate(['/log-in']); // Navigate to the login page after logging out
  }
}
