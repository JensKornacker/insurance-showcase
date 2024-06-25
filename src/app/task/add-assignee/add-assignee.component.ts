import {Component, EventEmitter, inject, Input, OnDestroy, Output} from '@angular/core';
import {IAddAssignee} from "../task.component";
import {Subscription} from "rxjs";
import {TaskService} from "../service/task.service";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-add-assignee',
  standalone: true,
  imports: [
    NgbDropdown,
    NgbDropdownItem,
    NgbDropdownMenu,
    NgbDropdownToggle,
    RouterLink
  ],
  templateUrl: './add-assignee.component.html',
  styleUrl: './add-assignee.component.scss'
})
export class AddAssigneeComponent implements OnDestroy {
  users: string[] = ["Jens Kornacker", "Gerhard Wieshammer", "Andi Gegendorfer", "Christoph Kösner"]
  private subscription$: Subscription[] = [];
  private taskService = inject(TaskService);
  @Input() taskId: string;
  @Output() formValue = new EventEmitter<IAddAssignee>();

  addAssignee(username: string) {
    let addAssignee: IAddAssignee = {
      username: username,
      taskId: this.taskId,
    }
    this.subscription$.push(
      this.taskService.addAssignee(addAssignee).subscribe({
        next: value => {
          this.formValue.emit(value);
        },
        error: err => {}
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription$.forEach((sub: Subscription) => {
      sub.unsubscribe();
    })
  }

}
