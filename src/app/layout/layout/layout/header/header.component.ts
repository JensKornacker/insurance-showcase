import {Component} from '@angular/core';
import {faBars, faLaptop, faGear} from '@fortawesome/free-solid-svg-icons';
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons/faRightFromBracket";

@Component({
             selector: 'app-header',
             templateUrl: './header.component.html',
             styleUrls: ['./header.component.scss']
           })
export class HeaderComponent {
  faLaptop = faLaptop;
  faBars = faBars;
  faBracket = faRightFromBracket;
  faGear = faGear;
}
