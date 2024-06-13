import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Subscription} from "rxjs";
import {FormsModule} from "@angular/forms";
import {TaskService} from "./service/task.service";
import {DatePipe, JsonPipe, KeyValuePipe, NgForOf} from "@angular/common";
import {SideLayoutService} from "../shared/side-layout.service";
import {TaskDto} from "./task-dto";
import {
  ManualWorthinessCheckTaskComponent
} from "./manual-worthiness-check-task/manual-worthiness-check-task.component";
import {
  ManualRiskAssessmentCheckTaskComponent
} from "./manual-risk-assessment-check-task/manual-risk-assessment-check-task.component";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {TaskFormComponent} from "./task-form/task-form.component";
import {TaskConfig} from "./task-config";
import {CompleteTaskEvent} from "./CompleteTaskEvent";

export interface IAddAssignee {
  username: string;
  taskId: string;
}

@Component({
  standalone: true,
  selector: 'app-task',
  templateUrl: './task.component.html',
  imports: [FormsModule, JsonPipe, KeyValuePipe, NgForOf, ManualWorthinessCheckTaskComponent, ManualRiskAssessmentCheckTaskComponent, NgbDropdown, NgbDropdownMenu, NgbDropdownItem, NgbDropdownToggle, DatePipe, RouterLink, TaskFormComponent],
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {

  @Input() taskId: string = "";
  private taskService = inject(TaskService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  private subscription$: Subscription[] = [];
  userTaskId: string;
  task: TaskDto;
  additionalInfo: Map<string, Map<string, string>>;
  users: string[] = ["Jens Kornacker", "Gerhard Wieshammer", "Andi Gegendorfer"]
  additionalMap: Map<string, any> = new Map();
  data: any;
  configData: TaskConfig;
  completeObject: object;

  deliverFormValue: object;



  constructor(
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
        this.data = this.task.config;
        this.configData = this.task.configData;
        console.log(this.additionalMap);
        console.log(this.data);
        console.log(this.configData);
      },
      error: err => {
        console.log('error', err);
      }
    })
  }

  addAssignee(username: string) {
    let addAssignee: IAddAssignee = {
      username: username,
      taskId: this.task.taskId,
    }
    this.subscription$.push(
      this.taskService.addAssignee(addAssignee).subscribe({
        next: value => {
          this.task = value;
        },
        error: err => {}
      })
    )
  }

  showFormValue(b: object) {
    console.log('deliverFormValue', this.deliverFormValue);
  }

  complete() {
    let creditCheckOutcome: string;
    let completeTask: CompleteTaskEvent = {
      taskId: this.task.taskId,
      aggregateId: this.task.aggregateId,
      completeVars: this.deliverFormValue,
      manualCreditCheckOutcome: creditCheckOutcome,
      manualRiskAssessmentOutcome: null,
      taskDefinition: this.task.taskDefinition,
    }
    console.log(completeTask);
    this.subscription$.push(
      this.taskService.complete(completeTask, this.task.url, this.task.completeEndpoint).subscribe({
        next: value => {
          this.router.navigate(['/task-list']).then();
        },
        error: err => {}
      })
    )
  }

}
