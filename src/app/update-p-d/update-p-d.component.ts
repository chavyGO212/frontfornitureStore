import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-p-d',
  templateUrl: './update-p-d.component.html',
  styleUrls: ['./update-p-d.component.css']
})
export class UpdatePDComponent implements OnInit {
  user: any;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const rawUser = localStorage.getItem('user');
    console.log('Raw user data from localStorage:', rawUser);


    this.user = JSON.parse(rawUser || '{}');
    if (!this.user || !this.user.id) {
        console.warn('User does not have an id, redirecting to login');
        this.router.navigate(['/log-in']); 
    } else {
        console.log('User loaded successfully:', this.user);
    }
}


onSubmit(): void {
  if (!this.user.id) {
    console.error('User ID is missing, unable to update user details');
    return;
  }

  const updateData = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      phone: this.user.phone
  };

  this.http.put(`http://localhost:9090/api/users/${this.user.id}`, updateData, { observe: 'response' }).subscribe(
    response => {
      console.log('Full response:', response);
      if (response.status === 200) {
        console.log('User details updated successfully', response);
        // Update local storage with new user details
        localStorage.setItem('user', JSON.stringify({ ...this.user, ...updateData }));
        this.router.navigate(['/personal-log-in']); 
      } else {
        console.error('Unexpected response status:', response.status);
      }
    },
    error => {
      console.error('Error updating user details', error);
      console.log('Error content:', error.error);
    }
  );
}



}
