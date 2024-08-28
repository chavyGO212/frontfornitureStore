import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ManageClientsService } from './manage-clients.service'

@Component({
  selector: 'app-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.css']
})
export class ManageClientsComponent {
  customers: any[] = [];

  constructor(private ManageClientsService: ManageClientsService) { }

  ngOnInit(): void {
    this.ManageClientsService.getAllCustomers().subscribe(data => {
      this.customers = data;
    });
  }
}

