import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { chairService } from './chair.service';

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
  subscription = new Subscription();
  readonly registerService = inject(chairService);
  
  constructor() {
  }
  ngOnInit(): void {
    
  }
  
  
 
  // פונקציה להירשם שתבוצע בלחיצה על הכפתור
  getChair() {
    console.log('get chair');
    this.subscription.add(this.registerService.getChair().subscribe(response => {
      console.log('get chair successful', response);
    }, error => {
      console.error('get chair failed', error);
    })
  )
  }

}


function getChair() {
  throw new Error('Function not implemented.');
}

