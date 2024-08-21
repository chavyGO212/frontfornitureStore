import { Component } from '@angular/core';
import {stockService} from './stock.service'
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {
  stock: any[]=[];
  constructor(private stockService: stockService) {}
    ngOnInit(): void {
      this.stockService.getData().subscribe(
        (response) => {
          this.stock = response;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    }

    //addItem():
  }
