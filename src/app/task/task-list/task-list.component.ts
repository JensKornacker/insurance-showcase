import {
  Component,
  Directive,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import {map, Observable, startWith, Subscription} from "rxjs";
import {CommonModule, DecimalPipe} from "@angular/common";
import {TaskService} from "../service/task.service";
import {RouterLink} from "@angular/router";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbHighlight, NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {TaskListDto} from "../task-list-dto";
import {TaskListService} from "./task-list.service";

export interface ITaskRequest {
  state: string;
  assigned?: boolean;
}

export type SortColumn = keyof TaskListDto | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  standalone: true,
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class NgbdSortableHeader {
  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

@Component({
  standalone: true,
  selector: 'app-task-list',
  imports: [CommonModule, RouterLink, DecimalPipe, ReactiveFormsModule, NgbHighlight, NgbdSortableHeader, FormsModule, NgbPagination],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, OnDestroy {

  private subscription$: Subscription[] = [];
  private taskService = inject(TaskService);
  taskList: TaskListDto[];
  taskList$: Observable<TaskListDto[]>;
  total$: Observable<number>;
  filter = new FormControl('', {nonNullable: true});
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  ngOnDestroy(): void {
    this.subscription$.forEach((s) => {
      s.unsubscribe();
    })
  }

  constructor(public service: TaskListService) {
    this.taskList$ = service.tasks$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    // this.getTaskList();
    console.log(this.taskList$);
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

  search(text: string): TaskListDto[] {
    return this.taskList.filter((task) => {
      if (task.assignee === undefined || task.assignee === null) {
        task.assignee = "";
      }
      const term = text.toLowerCase();
      return (
        task.taskId.toLowerCase().includes(term) ||
        task.customerName.toLowerCase().includes(term) ||
        task.title.toLowerCase().includes(term) ||
        task.assignee.toLowerCase().includes(term) ||
        task.createdAt.toLowerCase().includes(term)
      );
    });
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers

    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;

    // for (const header of this.headers) {
    //   if (header.sortable !== column) {
    //     header.direction = '';
    //   }
    // }
    //
    // if (direction === '' || column === '') {
    //
    // } else {
    //   this.taskList = [...this.taskList].sort((a, b) => {
    //     const res = compare(a[column], b[column]);
    //     return direction === 'asc' ? res : -res;
    //   });
    // }
  }

}
