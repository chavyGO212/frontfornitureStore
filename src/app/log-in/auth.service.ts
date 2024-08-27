import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: boolean = false;

  private loginUrl = 'http://localhost:9090/api/logIn'; // backend login URL

    // BehaviorSubject to track the login state and user data
    private userSubject: BehaviorSubject<any>;
    public user: Observable<any>;

  constructor(private http: HttpClient) { 
        // Initialize the BehaviorSubject with the user data from localStorage (if available)
        const userData = JSON.parse(localStorage.getItem('user') || 'null');
        this.userSubject = new BehaviorSubject<any>(userData);
        this.user = this.userSubject.asObservable();
  }

  // Login method to authenticate the user and store user data
  login(email: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, { email, password }).pipe(
      tap(user => {
        // Store user data in localStorage and update the BehaviorSubject
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
      })
    );
  }

  userlogin(): void {
    this.loggedIn = true;
  }

  userlogout(): void {
    this.loggedIn = false;
    this.logout();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  // Logout method to clear user data
  logout(): void {
    // Clear user data from localStorage and update the BehaviorSubject
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

}





  
