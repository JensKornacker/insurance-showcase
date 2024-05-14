import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SidebarComponent} from "./layout/layout/layout/sidebar/sidebar.component";
import {HeaderComponent} from "./layout/layout/layout/header/header.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {HomeComponent} from './home/home.component';
import {NgOptimizedImage} from "@angular/common";
import {WorkflowComponent} from "./workflow/workflow.component";
import {HttpClientModule} from "@angular/common/http";
import {ReactComponentDirective} from "./shared/react-component.directive";
import {WorkflowListComponent} from './workflow/workflow-list/workflow-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    HomeComponent,
    WorkflowComponent,
    WorkflowListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgOptimizedImage,
    HttpClientModule,
    ReactComponentDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
