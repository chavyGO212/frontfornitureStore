import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../register/register.service'; // עדכן את המיקום בהתאם
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-personal-log-in',
  templateUrl: './personal-log-in.component.html',
  styleUrls: ['./personal-log-in.component.css']
})
export class PersonalLogInComponent implements OnInit {
  isAdmin = false;
  user: any = {}; // אובייקט המשתמש

  constructor(private registrationService: RegistrationService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const userEmail = 'example@example.com'; // הכנס כאן את האימייל הרלוונטי, או קבל אותו מה-Route או מ-LocalStorage
    this.registrationService.getCustomerDetailsByEmail(userEmail).subscribe((data: any) => {
      this.user = data;
      if (this.user.premmission_type_id === 1) {
        this.isAdmin = true;
      }
    });
  }
}
