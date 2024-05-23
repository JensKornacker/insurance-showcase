import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {TaskComponent} from "./task/task.component";
import {WorkflowComponent} from "./workflow/workflow.component";
import {TaskListComponent} from "./task/task-list/task-list.component";
import {WorkflowListComponent} from "./workflow/workflow-list/workflow-list.component";
import {NewSignalComponent} from "./course/new-signal/new-signal.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'task-list', component: TaskListComponent},
  {path: 'workflow-list', component: WorkflowListComponent},
  {path: 'workflow/:id', component: WorkflowComponent},
  {path: 'tasks/:id', component: TaskComponent},
  {path: 'signals', component: NewSignalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
