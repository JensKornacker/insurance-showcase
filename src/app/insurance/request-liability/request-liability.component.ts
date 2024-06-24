import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CustomerService} from "../../customer/customer.service";
import {Customer} from "../../customer/customer";
import {faGhost} from "@fortawesome/free-solid-svg-icons/faGhost";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faAddressBook} from "@fortawesome/free-solid-svg-icons/faAddressBook";
import {faGenderless} from "@fortawesome/free-solid-svg-icons/faGenderless";
import {faListNumeric} from "@fortawesome/free-solid-svg-icons/faListNumeric";
import {faStreetView} from "@fortawesome/free-solid-svg-icons/faStreetView";
import {faCity} from "@fortawesome/free-solid-svg-icons/faCity";
import {faFlag} from "@fortawesome/free-solid-svg-icons/faFlag";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RequestInsurance} from "../../customer/request-insurance";
import {Message} from "../../customer/message";
import {Router} from "@angular/router";
import {CustomerCardComponent} from "../customer-card/customer-card.component";

@Component({
  selector: 'app-request-liability',
  standalone: true,
  imports: [
    FaIconComponent,
    ReactiveFormsModule,
    FormsModule,
    CustomerCardComponent
  ],
  templateUrl: './request-liability.component.html',
  styleUrl: './request-liability.component.scss'
})
export class RequestLiabilityComponent implements OnInit, OnDestroy {

  @Input() insuranceType: string;
  @Input() customerId: string;
  private subscription: Subscription[] = [];
  private customerService = inject(CustomerService);
  private readonly router = inject(Router);
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

  protected readonly faGhost = faGhost;
  protected readonly faAddressBook = faAddressBook;
  protected readonly faGenderless = faGenderless;
  protected readonly faListNumeric = faListNumeric;
  protected readonly faStreetView = faStreetView;
  protected readonly faCity = faCity;
  protected readonly faFlag = faFlag;
  sufficientIncome: boolean;
  mudslide_risk: boolean = false;
  flood_risk: boolean = false;
  insuranceSumSteps: number = 1;
  insuranceSum: string = "€ 750 Tsd";
  coverings: string[] = ["Basis", "Erweitert", "Voll"];
  chosenCoverage: string;

  request_insurance() {
    let requestInsurance: RequestInsurance = {
      insuranceType: this.insuranceType,
      customerId: this.customerId,
      mudslideRisk: this.mudslide_risk,
      floodRisk: this.flood_risk,
      sufficientIncome: this.sufficientIncome,
      insuranceCoverage: this.chosenCoverage,
      insuranceSum: this.insuranceSum,
      paymentSchedule: null,
      amount: null,
    }
    this.subscription.push(
      this.customerService.requestNewInsurance(requestInsurance).subscribe({
        next: value => {
          let message: Message = value;
          console.log(message.text)
          this.router.navigate(['/task-list']).then();
        },
        error: error => console.log(error),
      })
    )
  }

  volumeChange(event: Event) {
    switch (this.insuranceSumSteps) {
      case 1:
        this.insuranceSum = "€ 750 Tsd";
        break;
      case 2:
        this.insuranceSum = "€ 1,5 Mio";
        break;
      case 3:
        this.insuranceSum = "€ 3,0 Mio";
        break;
      default:
        this.insuranceSum = "€ 750 Tsd";
    }
  }

}
