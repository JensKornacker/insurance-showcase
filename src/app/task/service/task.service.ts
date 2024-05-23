import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpStatusCode} from "@angular/common/http";
import {ITaskRequest} from "../task-list/task-list.component";
import {Observable} from "rxjs";
import {TaskDto} from "../task-dto";
import {environment} from "../../../environments/environment";
import {ICompleteTaskEvent} from "../task.component";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  task_api = environment.task_api;
  api_url = environment.api_url;
  private auth: string = 'TASKLIST-SESSION=E5BBA4E426D16F2CC38238EE08F955C4';

  constructor(
    private http: HttpClient
  ) { }

  getTaskList(): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(this.task_api + '/tasks');
  }

  getTask(taskId: string): Observable<TaskDto> {
    return this.http.get<TaskDto>(this.task_api + '/tasks/' + taskId);
  }

  complete(completeTask: ICompleteTaskEvent, url: string, endpointUrl: string): Observable<string> {
    return this.http.post(url + endpointUrl, completeTask, {responseType: 'text'});
  }

}
