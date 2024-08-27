import { Component, OnInit } from '@angular/core';
import { AuthService } from './log-in/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'forniture-store';

  loggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loggedIn = this.authService.isLoggedIn();
  }
}

