import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  orderId: number;
  amount: number;
  user: any;
  paymentData = {
    cardholderId: '',
    cardholderFirstName: '',
    cardholderLastName: '',
    creditCardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: ''
  };

  months: string[] = [];
  years: number[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'];
      this.amount = params['amount'];
    });

    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    this.populateMonths();
    this.populateYears();
  }

  populateMonths(): void {
    this.months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  }

  populateYears(): void {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i <= currentYear + 20; i++) {
      this.years.push(i);
    }
  }

  onSubmit() {
    // Check if all fields are filled
    if (!this.paymentData.cardholderId || !this.paymentData.cardholderFirstName || !this.paymentData.cardholderLastName || !this.paymentData.creditCardNumber || !this.paymentData.expMonth || !this.paymentData.expYear || !this.paymentData.cvv) {
      return;
    }

    // Construct the payment request object
    const paymentRequest = {
      orderId: this.orderId,
      amount: this.amount,
      userId: this.user.id,
      ...this.paymentData,
      creditCardExpDate: `${this.paymentData.expMonth}/${this.paymentData.expYear.toString().slice(-2)}`
    };

    // Print the payment request to the console
    console.log('Sending payment request:', paymentRequest);

    // Send the HTTP POST request to the correct URL
    this.http.post('http://localhost:9090/api/payments/process', paymentRequest, { observe: 'response' }).subscribe({
      next: (response: any) => {
        console.log('Payment successful', response);
        // Navigate to the orders page after successful payment
        this.router.navigate(['/orders']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Payment failed', error);
        alert('Payment failed: ' + (error.error?.message || 'An unexpected error occurred. Please try again.'));
      }
    });
  }

}
