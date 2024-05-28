import {Component, inject, model, OnDestroy} from '@angular/core';
import {CustomerService} from "../customer.service";
import {FormsModule} from "@angular/forms";
import {Customer} from "../customer";
import {Subscription} from "rxjs";
import {NgbAlert, NgbCalendar, NgbDatepicker, NgbDateStruct, NgbInputDatepicker} from "@ng-bootstrap/ng-bootstrap";
import {JsonPipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [
    FormsModule,
    NgbDatepicker,
    JsonPipe,
    NgbInputDatepicker,
    NgbAlert
  ],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.scss'
})
export class CreateCustomerComponent implements OnDestroy{
  private customerService = inject(CustomerService);
  private router = inject(Router);
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  email: string;
  gender: string;
  street: string;
  zipCode: string;
  city: string;
  country: string;
  private subscription: Subscription[] = [];
  model: NgbDateStruct;

  create() {
    let customer: Customer = {
      firstname: this.firstname,
      lastname: this.lastname,
      dateOfBirth: this.editDate(this.model),
      email: this.email,
      gender: this.gender,
      street: this.street,
      zipCode: this.zipCode,
      city: this.city,
      country: this.country
    }
    this.subscription.push(
      this.customerService.createCustomer(customer).subscribe({
        next: value => {
          console.log(value);
          this.router.navigate(['/customers']).then();
        },
        error: err => {}
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => s.unsubscribe());
  }

  editDate(dateObject: NgbDateStruct) {
    let day = '';
    let month = '';
    if (dateObject.day.toString().length === 1) {
      day = '0' + dateObject.day;
    } else {
      day = dateObject.day.toString();
    }
    if (dateObject.month.toString().length === 1) {
      month = '0' + dateObject.month;
    } else {
      month = dateObject.month.toString();
    }
    return dateObject.year + '-' + month + '-' + day;
  }

}
