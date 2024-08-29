import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  user: any;

  constructor(private http: HttpClient, private router: Router, private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.fetchOrders();
  }

  fetchOrders() {
    this.ordersService.getUserOrders(this.user.id).subscribe(
      (data: any[]) => this.orders = data,
      (error: any) => console.error('Failed to fetch orders', error)
    );
  }

  viewOrderItems(orderId: number) {
    this.router.navigate(['/order-items'], { queryParams: { orderId } });
  }

  goToPayment(order: any, event: Event) {
    event.stopPropagation();
    this.router.navigate(['/payment'], { queryParams: { orderId: order.orderId, amount: order.totalPrice } });
  }

  updateAddress(orderId: number, event: Event) {
    event.stopPropagation();
    const newAddress = prompt("Enter new address:");
    if (newAddress) {
      this.ordersService.updateOrderAddress(orderId, newAddress, this.user.id).subscribe(
        () => this.fetchOrders()
      );
    }
  }

  cancelOrder(orderId: number, event: Event) {
    event.stopPropagation();
    this.ordersService.cancelOrder(orderId).subscribe(
      () => this.fetchOrders()
    );
  }
}
