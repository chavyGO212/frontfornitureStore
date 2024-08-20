import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Color } from './color.model'; // Assuming you have a Color model

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private apiUrl = 'http://localhost:9090/api/colors';

  constructor(private http: HttpClient) {}

  getColors(): Observable<Color[]> {
    return this.http.get<Color[]>(this.apiUrl);
  }

  addColor(color: Color): Observable<Color> {
    return this.http.post<Color>(this.apiUrl, color);
  }

  updateColor(id: number, color: Color): Observable<Color> {
    return this.http.put<Color>(`${this.apiUrl}/${id}`, color);
  }

  deleteColor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
