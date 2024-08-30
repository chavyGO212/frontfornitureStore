import { Component, OnInit } from '@angular/core';
import { manageShopingCartService } from './manage-shoping-cart.service';

@Component({
  selector: 'app-manage-shoping-cart',
  templateUrl: './manage-shoping-cart.component.html',
  styleUrls: ['./manage-shoping-cart.component.css']
})
export class ManageShopingCartComponent implements OnInit{
  manageShopingCart: any[] = [];
  constructor(private manageShopingCartService: manageShopingCartService) {}
    ngOnInit(): void {
      this.fetchShoppingCarts();
    }
    fetchShoppingCarts() {
    this.manageShopingCartService.getData().subscribe(
      (response) => {
        console.log('Full Response:', response); 
        this.manageShopingCart = response;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

    cancelCart(cartId: number): void {
      this.manageShopingCartService.cancelCart(cartId).subscribe(
          response => {
              alert('הזמנה בוטלה בהצלחה');
              this.ngOnInit(); // טוען מחדש את רשימת הסלים
          },
          error => {
              console.error('Error cancelling cart:', error);
              alert('שגיאה בביטול ההזמנה');
          }
      );
  }
  
  
  }
