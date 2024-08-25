import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: boolean = false;

  private loginUrl = 'http://localhost:9090/api/logIn'; // Your backend login URL

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    // Send the email and password in the body of the POST request
    return this.http.post(this.loginUrl, { email, password });
  }

  userlogin(): void {
    this.loggedIn = true;
  }

  userlogout(): void {
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}





  
