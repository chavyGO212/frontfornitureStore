import { Component, OnInit } from '@angular/core';
import { CatalogService } from './table-glery.service';  

@Component({
  selector: 'app-table-gallery',
  templateUrl: './table-galery.component.html',
  styleUrls: ['./table-galery.component.css']
})
export class TableGaleryComponent implements OnInit {
  items: any[] = [];

  constructor(private catalogService: CatalogService) {}

  ngOnInit() {
    this.catalogService.getItems().subscribe(data => {
      this.items = data;
    });
  }
}
