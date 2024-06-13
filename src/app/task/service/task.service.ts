import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TaskDto} from "../task-dto";
import {environment} from "../../../environments/environment";
import {IAddAssignee} from "../task.component";
import {CompleteTaskEvent} from "../CompleteTaskEvent";

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

  complete(completeTask: CompleteTaskEvent, url: string, endpointUrl: string): Observable<string> {
    return this.http.post(url + endpointUrl, completeTask, {responseType: 'text'});
  }

  addAssignee(addAssignee: IAddAssignee): Observable<TaskDto> {
    return this.http.post<TaskDto>(this.task_api + '/tasks/add-assignee', addAssignee);
  }

}
