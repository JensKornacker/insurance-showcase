import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {faCoffee, faUser, faBars, faPowerOff, faTachometerAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{

  pushRightClass: string | undefined;
  collapsed: boolean | undefined;
  showMenu: string | undefined;
  isActive: boolean | undefined;
  faTachometerAlt = faTachometerAlt;
  faUser = faUser;
  faBars = faBars;
  faPowerOff = faPowerOff;
  @Output() collapsedEvent = new EventEmitter<boolean>();

  constructor(public router: Router) {
    this.router.events.subscribe(val => {
      if (
        val instanceof NavigationEnd &&
        window.innerWidth <= 992 &&
        this.isToggled()
      ) {
        this.toggleSidebar();
      }
    });
  }

  ngOnInit(): void {
  }

  isToggled(): boolean {
    // @ts-ignore
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(<string>this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.collapsedEvent.emit(this.collapsed);
  }

  addExpandClass(element: string) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

}
