import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormsModule} from "@angular/forms";
import {TaskService} from "./service/task.service";
import {JsonPipe, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {SideLayoutService} from "../shared/side-layout.service";
import {TaskDto} from "./task-dto";
import {
  ManualWorthinessCheckTaskComponent
} from "./manual-worthiness-check-task/manual-worthiness-check-task.component";

export interface ICompleteTaskEvent {
  taskId: string;
  aggregateId: string;
  manualCreditCheckOutcome: string;
}

@Component({
  standalone: true,
  selector: 'app-task',
  templateUrl: './task.component.html',
  imports: [FormsModule, JsonPipe, KeyValuePipe, NgForOf, ManualWorthinessCheckTaskComponent],
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {

  @Input() taskId: string = "";

  private subscription$: Subscription[] = [];
  userTaskId: string;
  task: TaskDto;
  amount: number | undefined;
  additionalInfo: any;

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
    // this.sideLayoutService.showSideBarVar();
    this.userTaskId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getTask();
  }

  getTask() {
    this.taskService.getTask(this.userTaskId).subscribe({
      next: value => {
        this.task = value;
        this.additionalInfo = this.task.additionalInfo;
      },
      error: err => {
        console.log('error', err);
      }
    })
  }



}
