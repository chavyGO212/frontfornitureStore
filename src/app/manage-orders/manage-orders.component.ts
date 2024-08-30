import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../orders/orders.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent {
orders: any[] = [];

constructor(private http: HttpClient, private router: Router, private ordersService: OrdersService){}

viewOrderItems(orderId: number) {
  this.router.navigate(['/order-items'], { queryParams: { orderId } });
}


}
