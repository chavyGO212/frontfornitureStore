import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { itemService } from '../item/item.service';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { AuthService } from '../log-in/auth.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  product: any;
  quantity: number = 1;
  isLoggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private itemService: itemService,
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('productID');
    if (id) {
      this.itemService.getProductById(id).subscribe(
        data => {
          this.product = data;
        },
        error => {
          console.error('Error fetching product data:', error);
        }
      );
    } else {
      console.error('ID is null');
    }
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  
  
  addToCart(product: any) { 
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const customerId = user.id; // Retrieve the logged-in user's ID from localStorage
    
    const productId = product.productID;
    const quantity = this.quantity;
  
    this.shoppingCartService.addToCart(customerId, productId, quantity).subscribe(response => {
      this.router.navigate(['/shopping-cart']); 
    }, error => {
      console.error('Error adding to cart:', error);
    });
  }
  
  
  
}

