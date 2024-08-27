import { Component, OnInit } from '@angular/core';
import { ShopingCartService } from './shoping-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  customerId: number = 1; // This should be dynamically set to the logged-in user

  constructor(private shopingCartService: ShopingCartService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.customerId = user.id; // Retrieve the logged-in user's ID from localStorage
    this.loadCartItems();
  }
  

  loadCartItems(): void {
    this.shopingCartService.getCartItems(this.customerId).subscribe(items => {
      this.cartItems = items;
      this.calculateTotalAmount();
    });
  }

  calculateTotalAmount(): void {
    this.totalAmount = this.cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      this.updateCartItemQuantity(item.product.id, item.quantity - 1);
    }
  }

  increaseQuantity(item: any): void {
    this.updateCartItemQuantity(item.product.id, item.quantity + 1);
  }

  updateCartItemQuantity(productId: number, quantity: number): void {
    this.shopingCartService.addToCart(this.customerId, productId, quantity).subscribe(() => {
      this.loadCartItems();
    });
  }

  deleteItem(productId: number): void {
    this.shopingCartService.deleteCartItem(this.customerId, productId).subscribe(() => {
      this.loadCartItems();
    });
  }

  completeCart(): void {
    this.shopingCartService.completeCart(this.customerId).subscribe(() => {
      alert('Cart completed successfully!');
      this.loadCartItems(); // Optionally reload or clear cart items
    });
  }
}
