import { Component, OnInit } from '@angular/core';
import { ShopingCartService } from './shoping-cart.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;

  constructor(private ShopingCartService: ShopingCartService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.ShopingCartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotalAmount();
    });
  }

  calculateTotalAmount(): void {
    this.totalAmount = this.cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateTotalAmount();
    }
  }

  increaseQuantity(item: any): void {
    item.quantity++;
    this.calculateTotalAmount();
  }

  getCartItems(): Observable<any[]> {
    return this.ShopingCartService.getCartItems().pipe(
        tap((items: any) => console.log(items))
    );
}


}
