import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CustomerService} from "../../customer/customer.service";
import {RequestInsurance} from "../../customer/request-insurance";
import {Message} from "../../customer/message";
import {Customer} from "../../customer/customer";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {Coverage} from "../coverage";
import {Amount} from "../amount";
import {JsonPipe, KeyValuePipe} from "@angular/common";
import {ScheduleOfPayments} from "../schedule-of-payments";

@Component({
  selector: 'app-request-household',
  standalone: true,
  imports: [
    FormsModule,
    KeyValuePipe,
    JsonPipe
  ],
  templateUrl: './request-household.component.html',
  styleUrl: './request-household.component.scss'
})
export class RequestHouseholdComponent implements OnInit, OnDestroy {

  @Input() insuranceType: string;
  @Input() customerId: string;
  private subscription: Subscription[] = [];
  private customerService = inject(CustomerService);
  private readonly router = inject(Router);
  customer: Customer;
  flood_risk: boolean = false;
  mudslide_risk: boolean = false;
  sufficientIncome: boolean = false;
  insuranceSumSteps: number = 1;
  insuranceSum: string = "€ 750 Tsd";
  coverings: string[] = [Coverage.BASIS, Coverage.EXTENDED, Coverage.FULL];
  chosenCoverage: string;
  paymentSchedule: Map<string, number>;
  scheduleOfPayments: ScheduleOfPayments;
  mapScheduleOfPayments: Map<string, number> = new Map();
  scheduleAmount: number[];

  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this.getCustomer();
    this.setPaymentSchedule();
  }

  request_insurance() {
    let paymentSchedule: string;
    let amount: number;
    for (let [key, value] of Object.entries(this.paymentSchedule)) {
      if (key === "key") {
        paymentSchedule = value;
      } else if (key === "value") {
        amount = value;
      }
      console.log("for");
      console.log("key", key);
      console.log("value", value);
    }

    let requestInsurance: RequestInsurance = {
      insuranceType: this.insuranceType,
      customerId: this.customerId,
      mudslideRisk: this.mudslide_risk,
      floodRisk: this.flood_risk,
      sufficientIncome: this.sufficientIncome,
      insuranceCoverage: this.chosenCoverage,
      insuranceSum: this.insuranceSum,
      paymentSchedule: paymentSchedule,
      amount: amount
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
    console.log(requestInsurance);
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
    this.setPaymentSchedule();
  }

  setPaymentSchedule() {
    switch (this.insuranceSum) {
      case "€ 750 Tsd":
        if (this.chosenCoverage === Coverage.BASIS) {
          // this.scheduleOfPayments = ["monthly € 20.-", "semi-annually € 110.-", "annually € 220.-"];
          this.scheduleAmount = [Amount.TWENTY, Amount.HUNDRED_TEN, Amount.TWO_HUNDRED_TWENTY];
          this.mapScheduleOfPayments.set(ScheduleOfPayments.MONTHLY, Amount.TWENTY);
          this.mapScheduleOfPayments.set(ScheduleOfPayments.SEMI_ANNUALLY, Amount.HUNDRED_TEN);
          this.mapScheduleOfPayments.set(ScheduleOfPayments.YEARLY, Amount.TWO_HUNDRED_TWENTY);
        } else if (this.chosenCoverage === Coverage.EXTENDED) {
          // this.scheduleOfPayments = ["monthly € 30.-", "semi-annually € 170.-", "annually € 330.-"];
          this.scheduleAmount = [Amount.THIRTY, Amount.HUNDRED_SEVENTY, Amount.THREE_HUNDRED_THIRTY];
          this.mapScheduleOfPayments.set(ScheduleOfPayments.MONTHLY, Amount.THIRTY);
          this.mapScheduleOfPayments.set(ScheduleOfPayments.SEMI_ANNUALLY, Amount.HUNDRED_SEVENTY);
          this.mapScheduleOfPayments.set(ScheduleOfPayments.YEARLY, Amount.THREE_HUNDRED_THIRTY);
        } else if (this.chosenCoverage === Coverage.FULL) {
          // this.scheduleOfPayments = ["monthly € 35.-", "semi-annually € 210.-", "annually € 420.-"];
          this.scheduleAmount = [Amount.THIRTY_FIVE, Amount.TWO_HUNDRED_TEN, Amount.FOUR_HUNDRED_TWENTY];
          this.mapScheduleOfPayments.set(ScheduleOfPayments.MONTHLY, Amount.THIRTY_FIVE);
          this.mapScheduleOfPayments.set(ScheduleOfPayments.SEMI_ANNUALLY, Amount.TWO_HUNDRED_TEN);
          this.mapScheduleOfPayments.set(ScheduleOfPayments.YEARLY, Amount.FOUR_HUNDRED_TWENTY);
        }
        break;
      case "€ 1,5 Mio":
        if (this.chosenCoverage === Coverage.BASIS) {
          // this.scheduleOfPayments = ["monthly € 40.-", "semi-annually € 220.-", "annually € 440.-"];
          this.scheduleAmount = [Amount.FORTY, Amount.TWO_HUNDRED_TWENTY, Amount.FOUR_HUNDRED_FORTY];
          this.mapScheduleOfPayments.set(ScheduleOfPayments.MONTHLY, Amount.FORTY);
          this.mapScheduleOfPayments.set(ScheduleOfPayments.SEMI_ANNUALLY, Amount.TWO_HUNDRED_TWENTY);
          this.mapScheduleOfPayments.set(ScheduleOfPayments.YEARLY, Amount.FOUR_HUNDRED_FORTY);
        } else if (this.chosenCoverage === Coverage.EXTENDED) {
          // this.scheduleOfPayments = ["monthly € 45.-", "semi-annually € 240.-", "annually € 450.-"];
          this.scheduleAmount = [Amount.FORTY_FIVE, Amount.TWO_HUNDRED_FORTY, Amount.FOUR_HUNDRED_FIFTY];
          this.mapScheduleOfPayments.set(ScheduleOfPayments.MONTHLY, Amount.FORTY_FIVE);
          this.mapScheduleOfPayments.set(ScheduleOfPayments.SEMI_ANNUALLY, Amount.TWO_HUNDRED_FORTY);
          this.mapScheduleOfPayments.set(ScheduleOfPayments.YEARLY, Amount.FOUR_HUNDRED_FIFTY);
        } else if (this.chosenCoverage === Coverage.FULL) {
          // this.scheduleOfPayments = ["monthly € 50.-", "semi-annually € 250.-", "annually € 470.-"];
          this.scheduleAmount = [Amount.FIFTY, Amount.TWO_HUNDRED_FIFTY, Amount.FOUR_HUNDRED_SEVENTY];
          this.mapScheduleOfPayments.set(ScheduleOfPayments.MONTHLY, Amount.FIFTY);
          this.mapScheduleOfPayments.set(ScheduleOfPayments.SEMI_ANNUALLY, Amount.TWO_HUNDRED_FIFTY);
          this.mapScheduleOfPayments.set(ScheduleOfPayments.YEARLY, Amount.FOUR_HUNDRED_SEVENTY);
        }
        break;
      case "€ 3,0 Mio":
        if (this.chosenCoverage === Coverage.BASIS) {
          // this.scheduleOfPayments = ["monthly € 80.-", "semi-annually € 440.-", "annually € 880.-"];
          this.scheduleAmount = [Amount.EIGHTY, Amount.FOUR_HUNDRED_FORTY, Amount.EIGHT_HUNDRED_EIGHTY];
          this.mapScheduleOfPayments.set(ScheduleOfPayments.MONTHLY, Amount.EIGHTY);
          this.mapScheduleOfPayments.set(ScheduleOfPayments.SEMI_ANNUALLY, Amount.FOUR_HUNDRED_FORTY);
          this.mapScheduleOfPayments.set(ScheduleOfPayments.YEARLY, Amount.EIGHT_HUNDRED_EIGHTY);
        } else if (this.chosenCoverage === Coverage.EXTENDED) {
          // this.scheduleOfPayments = ["monthly € 90.-", "semi-annually € 450.-", "annually € 900.-"];
          this.scheduleAmount = [Amount.NINETY, Amount.FOUR_HUNDRED_FIFTY, Amount.NINE_HUNDRED];
          this.mapScheduleOfPayments.set(ScheduleOfPayments.MONTHLY, Amount.NINETY);
          this.mapScheduleOfPayments.set(ScheduleOfPayments.SEMI_ANNUALLY, Amount.FOUR_HUNDRED_FIFTY);
          this.mapScheduleOfPayments.set(ScheduleOfPayments.YEARLY, Amount.NINE_HUNDRED);
        } else if (this.chosenCoverage === Coverage.FULL) {
          // this.scheduleOfPayments = ["monthly € 105.-", "semi-annually € 510.-", "annually € 1050.-"];
          this.scheduleAmount = [Amount.HUNDRED_FIVE, Amount.FIVE_HUNDRED_TEN, Amount.ONE_THOUSAND_FIFTY];
          this.mapScheduleOfPayments.set(ScheduleOfPayments.MONTHLY, Amount.HUNDRED_FIVE);
          this.mapScheduleOfPayments.set(ScheduleOfPayments.SEMI_ANNUALLY, Amount.FIVE_HUNDRED_TEN);
          this.mapScheduleOfPayments.set(ScheduleOfPayments.YEARLY, Amount.ONE_THOUSAND_FIFTY);
        }
        break;
      default:
        // this.scheduleOfPayments = ["monthly € 20.-", "semi-annually € 110.-", "annually € 220.-"];
        this.scheduleAmount = [Amount.TWENTY, Amount.HUNDRED_TEN, Amount.TWO_HUNDRED_TWENTY];
    }
  }

}
