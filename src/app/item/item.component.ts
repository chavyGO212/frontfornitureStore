import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { itemService } from '../item/item.service';
import { ShopingCartService } from '../shopping-cart/shoping-cart.service';
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
    private shopingCartService: ShopingCartService,
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

  addToCart(): void {
    if (this.isLoggedIn && this.product) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const customerId = user.id; // Assuming the user object stored in localStorage has an 'id' field
  
      if (!customerId) {
        alert('User ID not found. Please log in again.');
        this.router.navigate(['/log-in']);
        return;
      }
  
      const productId = this.product.productID;
      this.shopingCartService.addToCart(customerId, productId, this.quantity).subscribe(() => {
        this.router.navigate(['/shopping-cart']);
      });
    } else {
      alert('עליך להתחבר כדי להוסיף לסל הקניות');
      this.router.navigate(['/log-in']);
    }
  }
  
  
}
