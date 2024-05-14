import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {RideBookedParameters} from "../workflow.component";

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  apiUrl = environment.api_url

  constructor(private http: HttpClient) {
  }

  bookRide(rideBooked: RideBookedParameters): Observable<string> {
    return this.http.post(this.apiUrl + '/api/v1/ride/booked', rideBooked, {responseType: 'text'});
  }

}
