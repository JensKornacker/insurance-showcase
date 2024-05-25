import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {CustomerService} from "../customer.service";
import {Customer} from "../customer";

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit, OnDestroy {

  // private customerId: string;
  private activatedRoute = inject(ActivatedRoute);
  private subscription: Subscription[] = [];
  private customerService = inject(CustomerService);
  customer: Customer;

  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    let customerId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getCustomer(customerId);
  }

  getCustomer(customerId: string) {
    this.subscription.push(
      this.customerService.getCustomer(customerId).subscribe({
        next: value => {
          this.customer = value;
        },
        error: error => console.log(error),
      })
    )
  }

}
