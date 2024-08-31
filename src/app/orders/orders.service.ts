import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private apiUrl = 'http://localhost:9090/api/orders'; 

  constructor(private http: HttpClient) { }

  getUserOrders(userId: number, isAdmin: boolean) {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`, { params: { isAdmin: isAdmin.toString() } });
  }
  
  

  getOrderItems(orderId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${orderId}/items`);
  }

  updateOrderAddress(orderId: number, newAddress: string, userId: number) {
    const params = new HttpParams()
      .set('orderId', orderId.toString())
      .set('newAddress', newAddress)
      .set('userId', userId.toString());
      
    return this.http.put(`${this.apiUrl}/update-address`, null, { params, responseType: 'text' });
  }
  
  

  cancelOrder(orderId: number): Observable<string> {
    return this.http.put(`${this.apiUrl}/cancel-order`, null, {
      params: { orderId: orderId.toString() }, 
      responseType: 'text'
    }) as Observable<string>;
  }

  

  completeOrder(orderId: number, adminUserId: number, options: any = {}): Observable<any> {
    return this.http.put(`${this.apiUrl}/complete-order`, null, { 
      params: { orderId: orderId.toString(), adminUserId: adminUserId.toString() },
      ...options
    });
  }
  
}
