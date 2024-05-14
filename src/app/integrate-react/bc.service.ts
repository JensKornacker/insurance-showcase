import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BcService {

  constructor(
    private http: HttpClient
  ) { }

  getBusinessCockpit() {
    return this.http.get("/api/app/info");
  }

}
