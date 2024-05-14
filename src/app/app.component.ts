import {Component, OnDestroy, OnInit} from '@angular/core';
import {SideLayoutService} from "./shared/side-layout.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'insurance-showcase';
  collapedSideBar: boolean = false;
  showSidebar = true;
  subscription: Subscription;

  constructor(
    private sideLayoutService: SideLayoutService
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.sideLayoutService.sidebar$.subscribe(() => {
      this.showSidebar = !this.showSidebar;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  receiveCollapsed($event: boolean) {
    this.collapedSideBar = $event;
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

}
