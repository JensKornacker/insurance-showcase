import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ReactComponentDirective} from "../../shared/react-component.directive";
import {CommonModule} from "@angular/common";
import {NavigateService} from "../../shared/navigate.service";

export interface ITaskRequest {
  state: string;
  assigned?: boolean;
}

const translations = {
  "title.long": 'Aufgaben',
  "title.short": 'Aufgaben',
  "total": "Anzahl:",
  "no": "Nr.",
  "name": "Aufgabe",
  "module-unknown": "Unbekanntes Modul",
  "retry-loading-module-hint": "Leider ist derzeit kein Zugriff auf die Aufgabe möglich!",
  "retry-loading-module-": "Laden nochmals probieren...",
  "typeofitem_unsupported": "Typfehler"
}

@Component({
  standalone: true,
  selector: 'app-task-list',
  imports: [ReactComponentDirective, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {

  private subscription$: Subscription[] = [];

  constructor(
    private navigateService: NavigateService
  ) {
  }

  ngOnDestroy(): void {
    this.subscription$.forEach((s) => {
      s.unsubscribe();
    })
  }

  ngOnInit(): void {
  }



}
