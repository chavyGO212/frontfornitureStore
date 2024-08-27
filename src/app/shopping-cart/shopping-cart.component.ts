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
  quantities: number[] = [];
  totalAmount: number = 0;


  constructor(private ShopingCartService: ShopingCartService) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.quantities = items.map(() => 1); 
    });
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

  getTotalAmount(): number {
    return this.cartItems.reduce((total, item, index) => 
      total + (this.quantities[index] * item.price), 0);
  }

  decreaseQuantity(index: number): void {
    if (this.quantities[index] > 1) {
      this.quantities[index]--;
    }
  }

  increaseQuantity(index: number): void {
    this.quantities[index]++;
  }


  getCartItems(): Observable<any[]> {
    return this.ShopingCartService.getCartItems().pipe(
        tap((items: any) => console.log(items))
    );
}
deleteItem(index: number): void {
  const itemId = this.cartItems[index].id;
  this.ShopingCartService.deleteFromCart(itemId).subscribe(() => {
    this.cartItems.splice(index, 1);
    this.quantities.splice(index, 1);
  });
}
// deleteItem(itemId: number) {
//   this.ShopingCartService.deleteFromCart(itemId).subscribe(() => {
//       this.cartItems = this.cartItems.filter(item => item.productID !== itemId);
//   });
// }
}

  

