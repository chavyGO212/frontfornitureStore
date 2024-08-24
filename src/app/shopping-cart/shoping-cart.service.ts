import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopingCartService {

  private apiUrl = 'http://localhost:9090/api/catalog/{id}'; 

  constructor(private http: HttpClient) { }

  private items: any[] = [];

  addToCart(product: any): void {
    this.items.push(product);
  }

  getItems(): any[] {
    return this.items;
  }

  clearCart(): any[] {
    this.items = [];
    return this.items;
  }

}

  