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
      this.manageShopingCartService.getData().subscribe(
        (response) => {
          this.manageShopingCart = response;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    }
  
  }

// shopingCarts = [
//   {orderNum:125555, customerNum:1548452, item:'vgh', addDate:'20.2.24', status:'בוצע'},
//   {orderNum:125555, customerNum:1548452, item:'vgh', addDate:'20.2.24', status:'בוצע'},
//   {orderNum:125555, customerNum:1548452, item:'vgh', addDate:'20.2.24', status:'בוצע'},
//   {orderNum:125555, customerNum:1548452, item:'vgh', addDate:'20.2.24', status:'בוצע'}
// ]
