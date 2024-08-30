import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private apiUrl = 'http://localhost:9090/api/orders'; 

  constructor(private http: HttpClient) { }

  getUserOrders(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  getOrderItems(orderId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${orderId}/items`);
  }

  updateOrderAddress(orderId: number, newAddress: string, userId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-address`, { orderId, newAddress, userId });
  }

  cancelOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cancel/${orderId}`);
  }
}
