import { Component, OnInit } from '@angular/core';
import { orderService } from './order.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
  orders: any[] = [];//דוגמא לקבלת נתונים בשורה 25
  constructor(private orderService: orderService) {}
    ngOnInit(): void {
      this.orderService.getData().subscribe(
        (response) => {
          this.orders = response;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    }
  
    }
  /*orders=[
    {name:'כסא כתר מעוצב',
      amount: 2,
      price_one: 60,
      price: 120,
      city: 'jm',
      street: '123',
      building: 6,
      home: 5,
      phone: 257635845,
      comments: 'jhfgdhjfbhdjnfbhdj',
      Delivery_type: 'delivery'
    },
    {name:'כסא כתר מעוצב',
      amount: 2,
      price_one: 60,
      price: 120,
      city: 'jm',
      street: '123',
      building: 6,
      home: 5,
      phone: 257635845,
      comments: 'jhfgdhjfbhdjnfbhdj',
      Delivery_type: 'delivery'
    }
  ]*/
   
   
    
    