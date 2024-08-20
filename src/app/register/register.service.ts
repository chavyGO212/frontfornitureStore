
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  // getCustomerDetails(arg0: number) {
  //   throw new Error('Method not implemented.');
  // }
  private apiUrl = 'http://localhost:9090/api/register';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    console.log('Sending registration data to server:', user);  // Log the data being sent
    return this.http.post(this.apiUrl, user);
  }

  getCustomerDetailsByEmail(email: string): Observable<any> {
    return this.http.get(`/api/users/${email}`);
  }
}
