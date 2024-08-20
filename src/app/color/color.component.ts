import { Component, inject, OnInit } from '@angular/core';
import { ColorService } from './color.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent  {
  subscription = new Subscription();
  readonly colorsService = inject(ColorService);
  addColorForm: FormGroup;
  
  constructor(private fb: FormBuilder, private colorService: ColorService) {
  }
  ngOnInit(): void {
    this.buildForm();
  }
  buildForm(){
    this.addColorForm = this.fb.group({
      colorCode: ['', [Validators.required]],
      colorDescription: ['', Validators.required],
    });
    console.log(this.addColorForm.value);
  
  }
  // פונקציה להירשם שתבוצע בלחיצה על הכפתור
  addColor() {
    console.log('Attempting to add color with data:', this.addColorForm.value);
    if (this.addColorForm.valid) {
        console.log('Form data being sent:', this.addColorForm.value); // Additional log before the HTTP request
        this.subscription.add(this.colorService.register(this.addColorForm.value).subscribe(
            response => {
                console.log('add color successful', response);
            },
            error => {
                console.error('add color failed', error);
            }
        ));
    } else {
        console.error('Form is not valid', this.addColorForm.value);
    }
}


}
