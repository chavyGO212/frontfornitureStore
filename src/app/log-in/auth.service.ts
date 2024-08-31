import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: boolean = false;

  private loginUrl = 'http://localhost:9090/api/logIn'; 

   
    private userSubject: BehaviorSubject<any>;
    public user: Observable<any>;

  constructor(private http: HttpClient) { 
        const userData = JSON.parse(localStorage.getItem('user') || 'null');
        this.userSubject = new BehaviorSubject<any>(userData);
        this.user = this.userSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, { email, password }).pipe(
      tap(user => {
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


  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

}





  
