import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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

export interface IAddAssignee {
  username: string;
  taskId: string;
}

@Component({
  standalone: true,
  selector: 'app-task',
  templateUrl: './task.component.html',
  imports: [FormsModule, JsonPipe, KeyValuePipe, NgForOf, ManualWorthinessCheckTaskComponent, ManualRiskAssessmentCheckTaskComponent, NgbDropdown, NgbDropdownMenu, NgbDropdownItem, NgbDropdownToggle, DatePipe],
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {

  @Input() taskId: string = "";

  private subscription$: Subscription[] = [];
  userTaskId: string;
  task: TaskDto;
  amount: number | undefined;
  additionalInfo: any;
  users: string[] = ["Jens Kornacker", "Gerhard Wieshammer", "Andi Gegendorfer"]

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

  addAssignee(username: string) {
    let addAssignee: IAddAssignee = {
      username: username,
      taskId: this.task.taskId,
    }
    console.log(addAssignee);
    this.subscription$.push(
      this.taskService.addAssignee(addAssignee).subscribe({
        next: value => {
          this.task = value;
        },
        error: err => {}
      })
    )
  }
}
