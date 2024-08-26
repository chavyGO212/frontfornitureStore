
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { itemService } from '../item/item.service';
import { ShopingCartService } from '../shopping-cart/shoping-cart.service';
import { AuthService } from '../log-in/auth.service'; // שירות לבדיקה אם המשתמש רשום

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
    private cartService: ShopingCartService,
    private authService: AuthService 
  ) {}

    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('productID');
      if (id) {
        this.itemService.getProductById(id).subscribe(data => {
          this.product = data;
        });
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

  addToCart(product: any): void {
    if (this.isLoggedIn) {
      this.cartService.addToCart({ ...product, quantity: this.quantity });
    } else {
      alert('עליך להתחבר כדי להוסיף לסל הקניות');
    }
  }
}