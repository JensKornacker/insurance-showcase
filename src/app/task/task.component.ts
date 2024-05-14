import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormsModule} from "@angular/forms";
import {TaskService} from "./service/task.service";
import {NgIf} from "@angular/common";
import {ReactComponentDirective} from "../shared/react-component.directive";
import {SideLayoutService} from "../shared/side-layout.service";

export interface IRideCharged {
  amount?: number;
}

@Component({
  standalone: true,
  selector: 'app-task',
  templateUrl: './task.component.html',
  imports: [
    FormsModule,
    NgIf,
    ReactComponentDirective
  ],
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {

  @Input() taskId: string = "";

  private subscription$: Subscription[] = [];
  userTaskId: string;
  amount: number | undefined;
  private rideCharged: IRideCharged | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private sideLayoutService: SideLayoutService
  ) {
  }

  ngOnDestroy(): void {
    this.subscription$.forEach((s) => {
      s.unsubscribe();
    })
  }

  ngOnInit(): void {
    this.sideLayoutService.showSideBarVar();
    this.userTaskId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.userTaskId);
  }

  charge() {
    this.rideCharged = {
      amount: this.amount
    }
    console.log("rideCharged", this.rideCharged);
    this.subscription$.push(
      this.taskService.completeTask(this.userTaskId, this.rideCharged).subscribe({
        next: (result) => {
          console.log('result', result);
          this.router.navigate(['/home'])
        },
        error: err => {
          console.log('error', err);
        }
      })
    )
  }
}
