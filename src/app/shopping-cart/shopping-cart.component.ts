import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

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
  deliveryOption: string = 'pickup'; // Default to pickup
  deliveryFee: number = 100; // Delivery fee

  constructor(private shoppingCartService: ShoppingCartService, private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.customerId = user.id; // Retrieve the logged-in user's ID from localStorage
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.shoppingCartService.getCartItems(this.customerId).subscribe(
      items => {
        this.cartItems = items;
        this.quantities = items.map(item => item.quantity); // Initialize quantities array based on cart items
        this.calculateTotalAmount();
      },
      error => {
        console.error('Error loading cart items:', error);
      }
    );
  }

  updateTotalAmount(): void {
    this.calculateTotalAmount();
  }

  calculateTotalAmount(): void {
    let total = this.cartItems.reduce((acc, item, index) => {
        const price = item.price || 0;
        const promotion = item.promotion || 0;
        const quantity = this.quantities[index] || 1;  // Use the updated quantity
        const itemTotal = quantity * price * ((100 - promotion) / 100);
        return acc + itemTotal;
    }, 0);

    if (this.deliveryOption === 'delivery') {
        total += this.deliveryFee; // Adding delivery charge if delivery is selected
    }

    this.totalAmount = total;
    console.log('Total Amount:', this.totalAmount);
}


  updateQuantity(index: number, newQuantity: number): void {
    const productId = this.cartItems[index].productID || this.cartItems[index].productId;

    if (!productId) {
        console.error('Product ID is undefined for item:', this.cartItems[index]);
        return;
    }

    if (newQuantity < 0) {
        console.warn('Quantity cannot be negative:', newQuantity);
        return;
    }

    console.log('Updating quantity:', {
        customerId: this.customerId,
        productId: productId,
        quantity: newQuantity
    });

    this.shoppingCartService.updateCartItem(this.customerId, productId, newQuantity).subscribe(
        (response: string) => {
            console.log('Backend response:', response);
            if (newQuantity === 0) {
                this.cartItems.splice(index, 1);
                this.quantities.splice(index, 1);
            } else {
                this.quantities[index] = newQuantity;
            }
            this.calculateTotalAmount();  // Ensure the total is recalculated after updating the quantity
        },
        (error: HttpErrorResponse) => {
            console.error('Error updating quantity:', error.message);
            console.log('Full error object:', error);
            if (error.error) {
                console.log('Backend error response:', error.error);
            }
        }
    );
}

  deleteItem(index: number): void {
    const productId = this.cartItems[index].productID;
    this.shoppingCartService.deleteFromCart(this.customerId, productId).subscribe(() => {
      this.cartItems.splice(index, 1);
      this.quantities.splice(index, 1);
      this.calculateTotalAmount();
    });
  }


  submitOrder(): void {
    const orderItems = this.cartItems.map(item => ({
        productId: item.productID || item.productId,
        quantity: item.quantity
    }));

    const order = {
        customerId: this.customerId,
        totalPrice: this.totalAmount,
        delivery: this.deliveryOption === 'delivery',
        address: this.deliveryOption === 'delivery' ? 'Please update address' : 'Pickup location',
        items: orderItems
    };

    console.log('Submitting order:', order);

    this.shoppingCartService.createOrder(order).subscribe(
        (response: any) => {
            console.log('Order submitted successfully');
            console.log('Order Response:', response);

            // Clear the shopping cart after order submission
            this.shoppingCartService.clearCart(this.customerId).subscribe(() => {
                console.log('Shopping cart cleared');

                // Redirect to the payment page with orderId and amount as query parameters
                this.router.navigate(['/payment'], { 
                    queryParams: { 
                        orderId: response.orderId, 
                        amount: response.totalPrice 
                    } 
                });
            }, (error: HttpErrorResponse) => {
                console.error('Error clearing cart:', error.message);
                // Optional: Handle cart clearing error, maybe inform the user or retry
            });
        },
        (error: HttpErrorResponse) => {
            console.error('Error submitting order:', error.message);
            // Optional: Handle order submission error, maybe inform the user or retry
        }
    );
}



  calculateTotalForItem(item: any, quantity: number): number {
    const price = item.price || 0;
    const promotion = item.promotion || 0;
    return quantity * price * ((100 - promotion) / 100);
  }
}
