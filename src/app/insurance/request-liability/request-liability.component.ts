import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CustomerService} from "../../customer/customer.service";
import {Customer} from "../../customer/customer";

@Component({
  selector: 'app-request-liability',
  standalone: true,
  imports: [],
  templateUrl: './request-liability.component.html',
  styleUrl: './request-liability.component.scss'
})
export class RequestLiabilityComponent implements OnInit, OnDestroy {

  @Input() insuranceType: string;
  @Input() customerId: string;
  private subscription: Subscription[] = [];
  private customerService = inject(CustomerService);
  customer: Customer;

  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer() {
    this.subscription.push(
      this.customerService.getCustomer(this.customerId).subscribe({
        next: value => {
          this.customer = value;
        },
        error: error => console.log(error),
      })
    )
  }

}
