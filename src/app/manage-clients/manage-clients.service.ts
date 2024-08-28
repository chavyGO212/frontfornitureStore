import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageClientsService {

  private apiUrl = 'http://localhost:9090/api/clients'; 

  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
