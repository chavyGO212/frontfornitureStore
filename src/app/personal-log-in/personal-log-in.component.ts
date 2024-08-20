import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrationService } from '../register/register.service';




@Component({
  selector: 'app-personal-log-in',
  templateUrl: './personal-log-in.component.html',
  styleUrls: ['./personal-log-in.component.css']
})
export class PersonalLogInComponent implements OnInit  {
  customer: any;

  constructor(private registrationService: RegistrationService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    const customerEmail = this.route.snapshot.paramMap.get('email'); 
    if (customerEmail !== null) {
      this.registrationService.getCustomerDetailsByEmail(customerEmail).subscribe(data => {
        this.customer = data;
      });
    } else {
      console.error('Customer email is null');
      // כאן תוכל להוסיף טיפול במקרה שבו customerEmail הוא null
    }
  }
  
}




  



