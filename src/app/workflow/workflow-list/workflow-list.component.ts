import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {Workflow} from "../workflow";

const translations = {
  "title.long": 'Workflows',
  "title.short": 'Workflows',
  "total": "Total:",
  "no": "No.",
  "name": "Workflow",
  "module-unknown": "Unknown module",
  "retry-loading-module-hint": "Unfortunately, the workflow cannot be shown at the moment!",
  "retry-loading-module": "Retry loading...",
  "does-not-exist": "The requested workflow does not exist!"
}

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.scss']
})
export class WorkflowListComponent {

  constructor(private router: Router) {
  }

  openWorkflow(workflowDef: Workflow) {
    this.router.navigate(['/workflow', workflowDef.id]).then(r => {
      console.log(r);
    })
  }

}
