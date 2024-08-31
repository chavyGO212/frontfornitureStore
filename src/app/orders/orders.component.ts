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
    const isAdmin = this.user.permissionType === 'admin';
    this.ordersService.getUserOrders(this.user.id, isAdmin).subscribe(
      (data: any[]) => {
        this.orders = data;
        this.orders.forEach(order => {
          console.log('Order:', order); 
        });
      },
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
        () => {
          console.log("Address updated successfully.");
          window.location.reload(); 
        },
        error => console.error("Failed to update address", error)
      );
    }
  }
  
  

  confirmCancelOrder(orderId: number, event: Event) {
    event.stopPropagation();
    if (confirm("Are you sure you want to cancel this order?")) {
      this.cancelOrder(orderId);
    }
  }

  cancelOrder(orderId: number) {
    this.ordersService.cancelOrder(orderId).subscribe({
      next: () => {
        console.log('Order successfully canceled.');
        this.fetchOrders(); 
      },
      error: error => {
        console.error('Failed to cancel the order', error);
      }
    });
  }


  completeOrder(orderId: number, event: Event) {
    event.stopPropagation();
  
 
    if (this.user.permissionType === 'admin') {
      this.ordersService.completeOrder(orderId, this.user.id, { responseType: 'text' }).subscribe({
        next: () => {
          console.log('Order successfully completed.');
          this.fetchOrders(); 
        },
        error: error => {
          console.error('Failed to complete the order', error);
        }
      });
    } else {
      alert("You don't have permission to complete this order.");
    }
  }
}
