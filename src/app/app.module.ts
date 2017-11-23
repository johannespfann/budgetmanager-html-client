import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppComponent }  from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { AddEntryComponent } from "./addentrycomponent/add-entry.component";
import { WelcomeComponent } from "./welcomecomponent/welcome.component";
import { PageNotFoundComponent } from "./errorcomponents/page-not-found.component";
import { LoginComponent } from "./logincomponent/login.component";
import { BalanceComponent } from "./balancecomponent/balance.component";
import { CategoryComponent } from "./categorycomponent/category.component";
import { HistoryComponent } from "./historycomponent/history.component";
import { CategoryService } from "./services/category.service";
import { EntryService } from "./services/entry.service";
import { AddCategoryComponent } from "./categorycomponent/add-category.component";
import { EditCategoryComponent } from "./categorycomponent/edit-category.component";
import { DeleteCategoryComponent } from "./categorycomponent/delete-category.component";
import { ComponentDirective } from "./categorycomponent/component.directive";
import { MessagingService } from "./services/message.service";
import { StartupService } from "./services/startup.service";

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, AppRoutingModule 
    ],
  declarations: [ 
    AppComponent,
    WelcomeComponent,
    AddEntryComponent,
    PageNotFoundComponent,
    BalanceComponent,
    CategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    DeleteCategoryComponent,
    HistoryComponent,
    LoginComponent,
    ComponentDirective
    ],
  entryComponents: [
    AddCategoryComponent,
    EditCategoryComponent,
    DeleteCategoryComponent
    ],
  providers: [
    CategoryService, 
    EntryService,
    MessagingService,
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: (startupService: StartupService) => function() {return startupService.onStartup()},
      deps: [StartupService],
      multi: true
    }
    ],
  bootstrap: [ AppComponent ]
})
export class AppModule { 
  constructor(){
    console.log("Init Application");
  }
}
