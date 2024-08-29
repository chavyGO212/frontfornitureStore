import { Component, OnInit } from '@angular/core';
import { PaymentService } from './payment.service';
import { ShopingCartService } from '../shopping-cart/shoping-cart.service'

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  shopingCart: any;
  totalPrice: number = 0;
  customerID: number;
  orderID: number;

  constructor(private ShopingCartService: ShopingCartService) {
      this.customerID = JSON.parse(localStorage.getItem('user') || '{}').id;
      this.orderID = 123; // כאן תשים את מזהה ההזמנה הרצוי
  }

  ngOnInit(): void {
      this.ShopingCartService.getOrderDetails(this.customerID, this.orderID).subscribe(data => {
          this.shopingCart = data;
          this.calculateTotalPrice();
      });
  }

  calculateTotalPrice(): void {
      this.totalPrice = this.shopingCart.items.reduce((acc: number, item: { catalog: { price: number; }; quantity: number; }) => acc + item.catalog.price * item.quantity, 0);
  }
}