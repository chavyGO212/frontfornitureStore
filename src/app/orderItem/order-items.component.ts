import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../orders/orders.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {
  orderItems: any[] = [];
  orderId: number;

  constructor(private route: ActivatedRoute, private ordersService: OrdersService, private router: Router) {}

  ngOnInit(): void {
    console.log('OrderItemsComponent initialized'); 
    this.route.queryParams.subscribe(params => {
        this.orderId = params['orderId'];
        console.log('Order ID:', this.orderId); 
        this.fetchOrderItems();
    });
}


fetchOrderItems() {
  console.log('Fetching order items for order ID:', this.orderId); 
  this.ordersService.getOrderItems(this.orderId).subscribe(
      data => {
          console.log('Order items received:', data); 
          this.orderItems = data;
      },
      error => console.error('Failed to fetch order items', error)
  );
}


  goBack() {
    this.router.navigate(['/orders']);
  }
}
