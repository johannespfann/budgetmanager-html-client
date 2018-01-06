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
import { TagService } from './services/tag.service';
<<<<<<< HEAD
import { EntryAPIService } from './services/entry.api.service';
import { HttpClientModule } from '@angular/common/http';
=======
import { LoginService } from './services/login.service';
import { RegisterComponent } from './logincomponent/register.component';

>>>>>>> 590fc8204278ea53625ee1cc615c4c285d1aac44

export function initApp(startupService: StartupService){
  return () => startupService.onStartup();
}

@NgModule({
  imports:      [ 
    HttpClientModule,
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
    RegisterComponent,
    ComponentDirective,
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
    TagService,
    EntryAPIService,
    StartupService,
    LoginService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [StartupService, EntryService, CategoryService, TagService],
      multi: true
    },
    ],
  bootstrap: [ AppComponent ]
})
export class AppModule { 
  constructor(){
    console.log("Init Application");
  }
}
