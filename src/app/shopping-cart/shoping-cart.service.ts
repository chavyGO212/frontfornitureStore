import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopingCartService {

  private apiUrl = 'http://localhost:9090/api/cart';

  userID = JSON.parse(localStorage.getItem('user') || 'null').id;


  constructor(private http: HttpClient) { }

  addToCart(cartItem: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${this.userID}/add`, cartItem);
  }

  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${this.userID}/items`);
  }

  deleteFromCart(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${this.userID}/delete/${itemId}`);
  }

  getOrderDetails(customerID: number, orderID: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${customerID}/order/${orderID}`);
}

}

  