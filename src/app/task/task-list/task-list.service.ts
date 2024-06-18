/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import {inject, Injectable, OnDestroy, Pipe, PipeTransform} from '@angular/core';

import {BehaviorSubject, debounceTime, delay, Observable, of, Subject, Subscription, switchMap, tap} from 'rxjs';

import { DecimalPipe } from '@angular/common';

import {TaskListDto} from "../task-list-dto";
import {TaskService} from "../service/task.service";
import {SortColumn, SortDirection} from "./task-list.component";

interface SearchResult {
  tasks: TaskListDto[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(tasks: TaskListDto[], column: SortColumn, direction: string): TaskListDto[] {
  if (direction === '' || column === '') {
    return tasks;
  } else {
    return [...tasks].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(task: TaskListDto, term: string, pipe: PipeTransform) {
  if (task.assignee === null) {
    task.assignee = "";
  }
  return (
    task.taskId.toLowerCase().includes(term.toLowerCase()) ||
    task.customerName.toLowerCase().includes(term.toLowerCase()) ||
    task.title.toLowerCase().includes(term.toLowerCase()) ||
    task.assignee.toLowerCase().includes(term.toLowerCase()) ||
    task.createdAt.toLowerCase().includes(term.toLowerCase())
  );
}

@Injectable({
  providedIn: 'root',
})
export class TaskListService implements OnDestroy {

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _tasks$ = new BehaviorSubject<TaskListDto[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private taskService = inject(TaskService);
  private subscription$: Subscription[] = [];
  taskList: TaskListDto[] = [];
  // private pipe = inject(DecimalPipe);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  constructor(
    private pipe: DecimalPipe
    ) {
    // this.getTaskList();
    this.subscription$.push(
      this.taskService.getTaskList().subscribe({
        next: value => {
          this.taskList = value;
          // this.getSearchMethod();
          this._search$
              .pipe(
                tap(() => this._loading$.next(true)),
                debounceTime(200),
                switchMap(() => this._search()),
                delay(200),
                tap(() => this._loading$.next(false)),
              )
              .subscribe((result) => {
                this._tasks$.next(result.tasks);
                this._total$.next(result.total);
              });

          this._search$.next();
        }
      })
    )

  }

  ngOnDestroy(): void {
    this.subscription$.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  }

  getTaskList() {
    this.subscription$.push(
      this.taskService.getTaskList().subscribe({
        next: value => {
          this.taskList = value;
          // this.getSearchMethod();
        }
      })
    )
  }

  get tasks$() {
    return this._tasks$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // 1. sort
    let tasks = sort(this.taskList, sortColumn, sortDirection);

    // 2. filter
    tasks = tasks.filter((task) => matches(task, searchTerm, this.pipe));
    const total = tasks.length;

    // 3. paginate
    tasks = tasks.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ tasks: tasks, total });
  }

}
