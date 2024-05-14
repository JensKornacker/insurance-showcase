import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ReactComponentDirective} from "../shared/react-component.directive";
import {BcService} from "./bc.service";
import {Subscription} from "rxjs";

@Component({
             standalone: true,
             selector: 'app-integrate-react',
             imports: [ReactComponentDirective, CommonModule],
             templateUrl: './integrate-react.component.html',
             styleUrls: ['./integrate-react.component.scss']
           })
export class IntegrateReactComponent implements OnInit {

  business: any;
  private subscription$: Subscription[] = [];


  constructor(
    private bcService: BcService
  ) {
  }

  ngOnInit(): void {
    this.getBc();
  }

  changeProps() {
  }

  getBc() {
    this.subscription$.push(
      this.bcService.getBusinessCockpit().subscribe({
                                                      next: (result) => {
                                                        this.business = result;
                                                      }
                                                    })
    )
  }

  showLoadingIndicator = () => {
  }

  toast() {
  }

  useGuiSse() {
  }

  useTasklistApi() {
  }

  openTask() {
  }

  navigateToWorkflow() {
  }

}
