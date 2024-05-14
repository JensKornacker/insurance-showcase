import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpStatusCode} from "@angular/common/http";
import {ITaskRequest} from "../task-list/task-list.component";
import {Observable} from "rxjs";
import {TaskDto} from "../task-dto";
import {environment} from "../../../environments/environment";
import {IRideCharged} from "../task.component";

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

  completeTask(rideId: string | null | undefined, rideCharged: IRideCharged): Observable<string> {
    return this.http.post(this.api_url + "/api/v1/ride/" + rideId + "/charged", rideCharged, {responseType: 'text'});
  }

  getTaskList(taskRequest: ITaskRequest): Observable<TaskDto[]> {
    return this.http.post<TaskDto[]>(
      this.task_api + '/v1/tasks/search', taskRequest,
      {headers: {"Cookie": this.auth }});
  }

}
