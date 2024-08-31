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
    creditCardExpDate: '',
    cvv: ''
  };

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'];
      this.amount = params['amount'];
    });

    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  onSubmit() {
    // Check if all fields are filled
    if (!this.paymentData.cardholderId || !this.paymentData.cardholderFirstName || !this.paymentData.cardholderLastName || !this.paymentData.creditCardNumber || !this.paymentData.creditCardExpDate || !this.paymentData.cvv) {
      return;
    }

    // Construct the payment request object
    const paymentRequest = {
      orderId: this.orderId,
      amount: this.amount,
      userId: this.user.id,
      ...this.paymentData
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
