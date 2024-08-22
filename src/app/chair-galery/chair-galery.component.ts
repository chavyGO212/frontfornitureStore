import { Component } from '@angular/core';
import { ChairGalleryService } from './chair-galery.service';  

@Component({
  selector: 'app-chair-galery',
  templateUrl: './chair-galery.component.html',
  styleUrls: ['./chair-galery.component.css']
})
export class ChairGaleryComponent {
  items: any[] = [];
  constructor(private ChairGalleryService: ChairGalleryService) {}

  ngOnInit() {
    this.ChairGalleryService.getItems().subscribe(data => {
      this.items = data;
    });
  }
}





  

  
