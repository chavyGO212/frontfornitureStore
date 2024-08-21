import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-item-component',
  templateUrl: './add-item-component.component.html',
  styleUrls: ['./add-item-component.component.css']
})
export class AddItemComponent {
AddItemForm: FormGroup<any>;
addItem(): any{}

}
