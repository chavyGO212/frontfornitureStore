import { Component, OnInit } from '@angular/core';
import { ShopingCartService } from './shoping-cart.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: any[] = [];
  quantities: number[] = [];
  totalAmount: number = 0;
  customerId: number;

  constructor(private shopingCartService: ShopingCartService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.customerId = user.id; // Retrieve the logged-in user's ID from localStorage
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.shopingCartService.getCartItems(this.customerId).subscribe(items => {
        this.cartItems = items;
        this.quantities = items.map(item => item.quantity); // Initialize quantities array based on cart items
        this.calculateTotalAmount();
    }, error => {
        console.error('Error loading cart items:', error);
    });
}

calculateTotalAmount(): void {
  this.totalAmount = this.cartItems.reduce((acc, item) => {
      const price = item.price || 0; // Fallback to 0 if price is undefined
      const promotion = item.promotion || 0; // Fallback to 0 if promotion is undefined
      const quantity = item.quantity || 1; // Fallback to 1 if quantity is undefined
      console.log(`Calculating for item: `, item.productName, ` Price: `, price, ` Promotion: `, promotion, ` Quantity: `, quantity);
      const itemTotal = quantity * price * ((100 - promotion) / 100);
      return acc + itemTotal;
  }, 0);
  console.log('Total Amount:', this.totalAmount);
}

calculateTotalForItem(item: any, quantity: number): number {
  const price = item.price || 0;
  const promotion = item.promotion || 0;

  const total = quantity * price * ((100 - promotion) / 100);

  if (isNaN(total)) {
    console.error('Calculation resulted in NaN:', { item, quantity, total });
    return 0; // Return 0 to avoid NaN in the UI
  }

  return total;
}

getTotalAmount(): number {
  return this.cartItems.reduce((total, item, index) => {
      const price = item.price || 0;
      const promotion = item.promotion || 0;
      const quantity = this.quantities[index] || 1;
      return total + (quantity * price * ((100 - promotion) / 100));
  }, 0);
}


decreaseQuantity(index: number): void {
  if (this.quantities[index] > 1) {
      this.quantities[index]--;
      this.calculateTotalAmount(); // Recalculate total amount after quantity change
  }
}

increaseQuantity(index: number): void {
  this.quantities[index]++;
  this.calculateTotalAmount(); // Recalculate total amount after quantity change
}

  getCartItems(customerId: number): Observable<any[]> {
    return this.shopingCartService.getCartItems(customerId).pipe(
      tap((items: any) => console.log(items))
    );
  }

  deleteItem(index: number): void {
    const itemId = this.cartItems[index].product.productID;
    this.shopingCartService.deleteFromCart(this.customerId, itemId).subscribe(() => {
      this.cartItems.splice(index, 1);
      this.quantities.splice(index, 1);
      this.calculateTotalAmount();
    });
  }
}
