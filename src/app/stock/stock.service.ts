import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'http://localhost:9090/api/catalog';

  constructor(private http: HttpClient) {}

  // Get all stock items (catalog items)
  getAllStock(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get a specific stock item by ID
  getStockById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Create a new stock item
  createStock(stockData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, stockData);
  }

  // Update an existing stock item
  updateStock(id: number, stockData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, stockData);
  }

  // Delete a stock item by ID
  deleteStock(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get all item types (enum values)
  getItemTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/item-types`);
  }
}
