import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-p-d',
  templateUrl: './update-p-d.component.html',
  styleUrls: ['./update-p-d.component.css']
})
export class UpdatePDComponent implements OnInit{
  user: any;
  constructor(private router: Router){}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!this.user) {
      this.router.navigate(['/log-in']); 
    }
  }
  

}
