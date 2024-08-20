import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrationService } from '../register/register.service';




@Component({
  selector: 'app-personal-log-in',
  templateUrl: './personal-log-in.component.html',
  styleUrls: ['./personal-log-in.component.css']
})
export class PersonalLogInComponent implements OnInit  {
  premmition_type_id = 1; 
  user: any; //קבלת פרטי המשתמש

  constructor(private registrationService: RegistrationService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    // //this.userService.getUserDetails().subscribe(user => {
    //   this.premmitionTypeId = user.premmition_type_id;  // קבלת הערך מהשרת
    // });
  }
  
}




  



