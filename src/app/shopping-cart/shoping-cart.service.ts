import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopingCartService {

  private apiUrl = 'http://localhost:9090/api/cart';

  constructor(private http: HttpClient) { }

  addToCart(customerId: number, productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${customerId}/add`, null, {
      params: {
        productId: productId.toString(),
        quantity: quantity.toString()
      }
    });
  }

  deleteCartItem(customerId: number, productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${customerId}/delete`, {
      params: { productId: productId.toString() }
    });
  }

  completeCart(customerId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${customerId}/complete`, null);
  }

  getCartItems(customerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${customerId}/items`);
  }
}
