import { Component, OnInit } from '@angular/core';
import { manageShopingCartService } from './manage-shoping-cart.service';

@Component({
  selector: 'app-manage-shoping-cart',
  templateUrl: './manage-shoping-cart.component.html',
  styleUrls: ['./manage-shoping-cart.component.css']
})


export class ManageShopingCartComponent implements OnInit{
  manageShopingCart: any[] = [];
  user: any=null;

  constructor(private manageShopingCartService: manageShopingCartService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }

    if (this.user && this.user.permissionType === 'admin') {
      this.fetchShoppingCarts();
    } else {
      console.error('Access denied: User is not an admin or user information is missing.');
    }
  }

  fetchShoppingCarts() {
    this.manageShopingCartService.getActiveCarts().subscribe(
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
      console.log('Cancel response:', response);
      alert('הזמנה בוטלה בהצלחה');
      this.ngOnInit(); // Reload the shopping cart list
    },
    error => {
      console.error('Error cancelling cart:', error);
      alert('שגיאה בביטול ההזמנה');
    }
  );
}

  
formatDate(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}
}
  
  
