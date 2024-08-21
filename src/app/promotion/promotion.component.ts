import { Component, OnInit } from '@angular/core';
import { PromotionService } from './promotion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Promotion } from './promotion.model'; 

@Component({
  selector: 'app-color',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
  promotions: Promotion[] = [];
  addPromotionForm: FormGroup;
  editMode: boolean = false;
  promotionToEdit: Promotion | null = null;

  constructor(private fb: FormBuilder, private promotionService: PromotionService) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadPromotions();
  }

  buildForm() {
    this.addPromotionForm = this.fb.group({
      description: ['', Validators.required],
      discount: ['', Validators.required],
    });
  }

  loadPromotions() {
    this.promotionService.getPromotion().subscribe(
      (data) => {
        this.promotions = data;
      },
      (error) => {
        console.error('Failed to load promotions', error);
      }
    );
  }

  onSubmit() {
    if (this.addPromotionForm.valid) {
      if (this.editMode && this.promotionToEdit) {
        this.promotionService.updatePromotion(this.promotionToEdit.promotionCode, this.addPromotionForm.value).subscribe(
          (updatedPromotion) => {
            this.loadPromotions();
            this.resetForm();
          },
          (error) => {
            console.error('Failed to update promotion', error);
          }
        );
      } else {
        this.promotionService.addPromotion(this.addPromotionForm.value).subscribe(
          (newPromotion) => {
            this.promotions.push(newPromotion);
            this.resetForm();
          },
          (error) => {
            console.error('Failed to add the promotion', error);
          }
        );
      }
    }
  }

  onEdit(promotion: Promotion) {
    this.editMode = true;
    this.promotionToEdit = promotion;
    this.addPromotionForm.patchValue(promotion);
  }

  onDelete(id: number) {
    this.promotionService.deletePromotion(id).subscribe(
      () => {
        this.promotions = this.promotions.filter(promotion => promotion.promotionCode !== id);
      },
      (error) => {
        console.error('Failed to delete promotion', error);
      }
    );
  }

  resetForm() {
    this.addPromotionForm.reset();
    this.editMode = false;
    this.promotionToEdit = null;
  }
}
