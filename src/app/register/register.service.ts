
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = 'http://localhost:9090/api/register';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    console.log('Sending registration data to server:', user);  // Log the data being sent
    return this.http.post(this.apiUrl, user);
  }
}
