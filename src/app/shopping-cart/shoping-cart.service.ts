import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopingCartService {

  private apiUrl = 'http://localhost:9090/api/cart';

  constructor(private http: HttpClient) { }

  addToCart(cartItem: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, cartItem);
  }

  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/items`);
  }
}

  