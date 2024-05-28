import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CustomerService} from "../../customer/customer.service";
import {RequestInsurance} from "../../customer/request-insurance";
import {Message} from "../../customer/message";
import {Customer} from "../../customer/customer";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-request-household',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './request-household.component.html',
  styleUrl: './request-household.component.scss'
})
export class RequestHouseholdComponent implements OnInit, OnDestroy {

  @Input() insuranceType: string;
  @Input() customerId: string;
  private subscription: Subscription[] = [];
  private customerService = inject(CustomerService);
  customer: Customer;
  flood_risk: boolean = false;
  mudslide_risk: boolean = false;

  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this.getCustomer();
  }

  request_insurance() {
    let requestInsurance: RequestInsurance = {
      insuranceType: this.insuranceType,
      customerId: this.customerId,
      mudslideRisk: this.mudslide_risk,
      floodRisk: this.flood_risk
    }
    this.subscription.push(
      this.customerService.requestNewInsurance(requestInsurance).subscribe({
        next: value => {
          let message: Message = value;
          console.log(message.text)
        },
        error: error => console.log(error),
      })
    )
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
