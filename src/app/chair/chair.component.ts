import { Component } from '@angular/core';

@Component({
  selector: 'app-chair',
  templateUrl: './chair.component.html',
  styleUrls: ['./chair.component.css']
})
export class ChairComponent {
  chair={
    productName: '',
    description: '',
    descriptionFull: '',
    color: '', //color type
    price: 0, //number typy
    promotion: '', //?needed
    stock: ''//? needed
  }
}
