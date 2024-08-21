import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StockService } from './stock.service';
import { ColorService } from '../color/color.service';
import { PromotionService } from '../promotion/promotion.service';
import { Color } from '../color/color.model'; 
import { Promotion } from '../promotion/promotion.model';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html', 
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  addStockForm: FormGroup;
  colors: Color[] = []; 
  itemTypes: string[] = []; 
  stockList: any[] = []; 
  promotions: Promotion[] = []; 
  filteredStockList: any[] = [];
  editMode = false; 
  editStockId: number | null = null; 
  searchTerm: string = ''; 

  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private colorService: ColorService,
    private promotionService: PromotionService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadInitialData();
  }

  initializeForm(): void {
    this.addStockForm = this.fb.group({
      productName: [''], 
      typeOfItem: [''], 
      colorCode: [''], 
      promotionCode: [''], 
      description: [''], 
      descriptionFull: [''], 
      price: [''], 
      stock: [''], 
      status: ['true'] 
    });
  }

  loadInitialData(): void {
    this.fetchColors();
    this.fetchItemTypes();
    this.fetchPromotions();
    this.fetchStockList();
  }

  fetchColors(): void {
    this.colorService.getColors().subscribe((data: Color[]) => {
      this.colors = data;
      console.log('Fetched colors:', this.colors);
    });
  }

  fetchItemTypes(): void {
    this.stockService.getItemTypes().subscribe((data: string[]) => {
      this.itemTypes = data;
      console.log('Fetched item types:', this.itemTypes);
    });
  }

  fetchPromotions(): void {
    this.promotionService.getPromotion().subscribe((data: Promotion[]) => {
      this.promotions = data;
      console.log('Fetched promotions:', this.promotions);
    });
  }

  fetchStockList(): void {
    this.stockService.getAllStock().subscribe((data: any[]) => {
      this.stockList = data;
      this.filteredStockList = data; 
      console.log('Fetched stock list:', this.stockList);
    });
  }

  filterStockList(): void {
    this.filteredStockList = this.stockList.filter(stock => 
      stock.productName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      stock.typeOfItem.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      stock.color.colorDescription.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      stock.promotion.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSubmit(): void {
    if (this.addStockForm.valid) {
      const stockData = this.addStockForm.value;
      console.log('Form data before submission:', stockData);

      if (this.editMode && this.editStockId !== null) {
        this.stockService.updateStock(this.editStockId, stockData).subscribe(() => {
          this.resetForm();
          this.fetchStockList();
        });
      } else {
        this.stockService.createStock(stockData).subscribe(() => {
          this.resetForm();
          this.fetchStockList();
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
      promotionCode: stock.promotion.promotionCode,
      description: stock.description,
      descriptionFull: stock.descriptionFull,
      price: stock.price,
      stock: stock.stock,
      status: stock.status
    });
  }

  onDelete(productId: number): void {
    this.stockService.deleteStock(productId).subscribe(() => {
      this.fetchStockList();
    });
  }

  resetForm(): void {
    this.editMode = false;
    this.editStockId = null;
    this.addStockForm.reset({
      status: 'true' 
    });
  }
}
