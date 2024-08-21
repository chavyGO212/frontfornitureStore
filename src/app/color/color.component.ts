import { Component, OnInit } from '@angular/core';
import { ColorService } from './color.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Color } from './color.model'; 

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  addColorForm: FormGroup;
  editMode: boolean = false;
  colorToEdit: Color | null = null;

  constructor(private fb: FormBuilder, private colorService: ColorService) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadColors();
  }

  buildForm() {
    this.addColorForm = this.fb.group({
      colorDescription: ['', Validators.required],
    });
  }

  loadColors() {
    this.colorService.getColors().subscribe(
      (data) => {
        this.colors = data;
      },
      (error) => {
        console.error('Failed to load colors', error);
      }
    );
  }

  onSubmit() {
    if (this.addColorForm.valid) {
      if (this.editMode && this.colorToEdit) {
        this.colorService.updateColor(this.colorToEdit.colorCode, this.addColorForm.value).subscribe(
          (updatedColor) => {
            this.loadColors();
            this.resetForm();
          },
          (error) => {
            console.error('Failed to update color', error);
          }
        );
      } else {
        this.colorService.addColor(this.addColorForm.value).subscribe(
          (newColor) => {
            this.colors.push(newColor);
            this.resetForm();
          },
          (error) => {
            console.error('Failed to add color', error);
          }
        );
      }
    }
  }

  onEdit(color: Color) {
    this.editMode = true;
    this.colorToEdit = color;
    this.addColorForm.patchValue(color);
  }

  onDelete(id: number) {
    this.colorService.deleteColor(id).subscribe(
      () => {
        this.colors = this.colors.filter(color => color.colorCode !== id);
      },
      (error) => {
        console.error('Failed to delete color', error);
      }
    );
  }

  resetForm() {
    this.addColorForm.reset();
    this.editMode = false;
    this.colorToEdit = null;
  }
}
