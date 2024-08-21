import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StockService } from './stock.service';
import { ColorService } from '../color/color.service';
import { Color } from '../color/color.model'; // Import the Color interface
import { Promotion } from '../promotion/promotion.model';
import { PromotionService } from '../promotion/promotion.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html', // Ensure this points to the correct template file
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  addStockForm: FormGroup;
  colors: Color[] = []; // List of colors fetched from the backend
  itemTypes: string[] = []; // List of item types fetched from the backend
  stockList: any[] = []; // List of stock items displayed in the table
  promotions: Promotion[] = []; //List of promotions displayed in the table
  editMode = false; // Indicates whether the form is in edit mode
  editStockId: number | null = null; // The ID of the stock item being edited

  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private colorService: ColorService,
    private promotionService: PromotionService
  ) {}

  ngOnInit(): void {
    this.addStockForm = this.fb.group({
      productName: [''], // Name of the product
      typeOfItem: [''], // Type of item (e.g., chair, table)
      colorCode: [''], // Code of the selected color
      promotionCode: [''],//Promotion
      description: [''], // Short description of the product
      descriptionFull: [''], // Full description of the product
      price: [''], // Price of the product
      stock: [''], // Available stock of the product
      status: ['true'] // Availability status of the product (true = available)
    });

    this.fetchColors(); // Fetch available colors from the backend
    this.fetchItemTypes(); // Fetch available item types from the backend
    this.fetchStockList(); // Fetch the list of stock items from the backend
    this.fetchPromotions();//Fetch the List of promotions from the backend
  }

  fetchColors(): void {
    this.colorService.getColors().subscribe((data: Color[]) => {
      this.colors = data;
      console.log('Fetched colors:', this.colors); // Log fetched colors for debugging
    });
  }

  fetchItemTypes(): void {
    this.stockService.getItemTypes().subscribe((data: string[]) => {
      this.itemTypes = data;
      console.log('Fetched item types:', this.itemTypes); // Log fetched item types for debugging
    });
  }

  fetchStockList(): void {
    this.stockService.getAllStock().subscribe((data: any[]) => {
      this.stockList = data;
      console.log('Fetched stock list:', this.stockList); // Log fetched stock items for debugging
    });
  }

  fetchPromotions(): void { // Fetch promotions from backend
    this.promotionService.getPromotion().subscribe((data: Promotion[]) => {
      this.promotions = data;
    });
  }

  onSubmit(): void {
    if (this.addStockForm.valid) {
      const stockData = this.addStockForm.value;
      console.log('Form data before submission:', stockData); // Log form data before sending it to the backend

      if (this.editMode && this.editStockId !== null) {
        this.stockService.updateStock(this.editStockId, stockData).subscribe(() => {
          this.resetForm();
          this.fetchStockList(); // Refresh the stock list after updating
        });
      } else {
        this.stockService.createStock(stockData).subscribe(() => {
          this.resetForm();
          this.fetchStockList(); // Refresh the stock list after creating a new item
        });
      }
    }
  }

  onEdit(stock: any): void {
    this.editMode = true;
    this.editStockId = stock.productID;
    this.addStockForm.patchValue({
      productName: stock.productName,
      typeOfItem: stock.typeOfItem,
      colorCode: stock.color.colorCode,
      description: stock.description,
      descriptionFull: stock.descriptionFull,
      price: stock.price,
      stock: stock.stock,
      status: stock.status
    });
  }

  onDelete(productId: number): void {
    this.stockService.deleteStock(productId).subscribe(() => {
      this.fetchStockList(); // Refresh the stock list after deleting an item
    });
  }

  resetForm(): void {
    this.editMode = false;
    this.editStockId = null;
    this.addStockForm.reset({
      status: 'true' // Reset status to 'true' by default
    });
  }
}
