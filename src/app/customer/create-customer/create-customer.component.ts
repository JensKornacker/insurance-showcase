import {Component, inject, OnDestroy} from '@angular/core';
import {CustomerService} from "../customer.service";
import {FormsModule} from "@angular/forms";
import {Customer} from "../customer";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.scss'
})
export class CreateCustomerComponent implements OnDestroy{
  private customerService = inject(CustomerService);
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  email: string;
  gender: string;
  private subscription: Subscription[] = [];

  create() {
    let customer: Customer = {
      firstname: this.firstname,
      lastname: this.lastname,
      dateOfBirth: this.dateOfBirth,
      email: this.email,
      gender: this.gender,
    }
    this.subscription.push(
      this.customerService.createCustomer(customer).subscribe({
        next: value => {
          console.log(value);
        },
        error: err => {}
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => s.unsubscribe());
  }
}
