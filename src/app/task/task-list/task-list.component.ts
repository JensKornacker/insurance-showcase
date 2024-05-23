import {Component, OnDestroy, OnInit} from '@angular/core';
import {of, Subscription} from "rxjs";
import {CommonModule} from "@angular/common";
import {NavigateService} from "../../shared/navigate.service";
import {TaskService} from "../service/task.service";
import {TaskDto} from "../task-dto";
import {RouterLink} from "@angular/router";

export interface ITaskRequest {
  state: string;
  assigned?: boolean;
}

@Component({
  standalone: true,
  selector: 'app-task-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {

  private subscription$: Subscription[] = [];
  taskList: TaskDto[];

  constructor(
    private navigateService: NavigateService,
    private taskService: TaskService,
  ) {
  }

  ngOnDestroy(): void {
    this.subscription$.forEach((s) => {
      s.unsubscribe();
    })
  }

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList() {
    this.subscription$.push(
      this.taskService.getTaskList().subscribe({
        next: value => {
          this.taskList = value;
          console.log(value);
          console.log(this.taskList);
        }
      })
    )
  }

  protected readonly of = of;
}
