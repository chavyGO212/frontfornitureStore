import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { itemService } from '../item/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  item: any;

  constructor(private route: ActivatedRoute, private itemService: itemService) { }

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    this.itemService.getItemById(Number(itemId)).subscribe(data => {
      this.item = data;
    });
  }
}
