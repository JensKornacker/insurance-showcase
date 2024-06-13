import {Component, inject, OnDestroy, OnInit, PipeTransform} from '@angular/core';
import {map, Observable, of, startWith, Subscription} from "rxjs";
import {CommonModule, DecimalPipe} from "@angular/common";
import {TaskService} from "../service/task.service";
import {TaskDto} from "../task-dto";
import {RouterLink} from "@angular/router";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {NgbHighlight} from "@ng-bootstrap/ng-bootstrap";

export interface ITaskRequest {
  state: string;
  assigned?: boolean;
}

@Component({
  standalone: true,
  selector: 'app-task-list',
  imports: [CommonModule, RouterLink, DecimalPipe, ReactiveFormsModule, NgbHighlight],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [DecimalPipe],
})
export class TaskListComponent implements OnInit, OnDestroy {

  private subscription$: Subscription[] = [];
  private taskService = inject(TaskService);
  taskList: TaskDto[];
  taskList$: Observable<TaskDto[]>;
  filter = new FormControl('', {nonNullable: true});

  ngOnDestroy(): void {
    this.subscription$.forEach((s) => {
      s.unsubscribe();
    })
  }

  ngOnInit(): void {
    this.getTaskList();
  }

  getSearchMethod() {
    this.taskList$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => this.search(text))
    )
  }

  getTaskList() {
    this.subscription$.push(
      this.taskService.getTaskList().subscribe({
        next: value => {
          this.taskList = value;
          this.getSearchMethod();
        }
      })
    )
  }

  search(text: string): TaskDto[] {
    return this.taskList.filter((task) => {
      if (task.assignee === undefined || task.assignee === null) {
        task.assignee = "";
      }
      const term = text.toLowerCase();
      return (
        task.taskId.toLowerCase().includes(term) ||
        task.additionalInfo.customer.Name.toLowerCase().includes(term) ||
        task.title.toLowerCase().includes(term) ||
        task.assignee.toLowerCase().includes(term) ||
        task.createdAt.toLowerCase().includes(term)
      );
    });
  }

}
