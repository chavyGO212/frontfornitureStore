import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class stockService {

  private apiUrlGet = 'http://localhost:9090/api/getStock'; 
  private apiUrlaDD = 'http://localhost:9090/api/addStock'; 
  private apiUrlDelete = 'http://localhost:9090/api/deleteStock/${id}'; 

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrlGet);
    //return this.http.get<any>(this.apiUrl);
  }

  addItem(item: any): Observable<any> {
    return this.http.post(this.apiUrlaDD, item);
   }

   deleteItem(item: any): Observable<any>{
    return this.http.delete(this.apiUrlDelete);
     
   }
}
