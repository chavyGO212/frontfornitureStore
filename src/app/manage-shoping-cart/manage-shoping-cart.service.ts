import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class manageShopingCartService {

  private apiUrl = 'http://localhost:9090/api/cart'; 

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  cancelCart(cartId: number): Observable<string> {
    return this.http.put(`${this.apiUrl}/${cartId}/cancel`, {}, { responseType: 'text' }) as Observable<string>;
  }


getActiveCarts(): Observable<any> {
  return this.http.get<any[]>(`${this.apiUrl}/active`);
}


}
