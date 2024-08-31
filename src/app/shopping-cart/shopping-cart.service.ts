import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private apiUrl = 'http://localhost:9090/api/cart';

  constructor(private http: HttpClient) { }

  addToCart(customerId: number, productId: number, quantity: number): Observable<any> {
    const cartItemDTO = { productId, quantity };
    return this.http.post(`${this.apiUrl}/${customerId}/add`, cartItemDTO);
  }

  getCartItems(customerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${customerId}/items`);
  }

  deleteFromCart(customerId: number, productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${customerId}/delete`, {
      params: { productId: productId.toString() }
    });
  }

  updateCartItem(customerId: number, productId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${customerId}/update`, { productId, quantity }, { responseType: 'text' });
}

createOrder(order: any): Observable<any> {
  return this.http.post('http://localhost:9090/api/orders/create', order);
}

clearCart(customerId: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${customerId}/clear`);
}


}
