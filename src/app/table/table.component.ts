import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  table={
    productName: '',
    description: '',
    descriptionFull: '',
    color: '', //color type
    price: 0, //number typy
    promotion: '', //?needed
    stock: ''//? needed
  }
}
