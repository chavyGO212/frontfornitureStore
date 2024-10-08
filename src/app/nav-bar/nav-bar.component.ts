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

    this.authService.user.subscribe(user => {
      this.loggedIn = !!user; 
    });
  }

  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/log-in']); 
  }
}
