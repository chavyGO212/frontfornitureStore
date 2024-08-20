
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class chairService {
  private apiUrl = 'http://localhost:9090/api/catalog';

  constructor(private http: HttpClient) {}

  getChair(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
