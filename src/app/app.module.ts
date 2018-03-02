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
import { ComponentDirective } from "./categorycomponent/component.directive";
import { MessagingService } from "./messages/message.service";
import { TagService } from './services/tag.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { RegisterComponent } from './logincomponent/register.component';
import { ActivateComponent } from './logincomponent/activate.component';
import { ApplicationService } from './application/application.service';
import { CategoryRestApiService } from './services/category-rest-api.service';
import { DeleteCategoryComponent } from './categorycomponent/delete-category.component';
import { EntryAPIService } from './services/entry.api.service';
import { EditEntryComponent } from './historycomponent/edit-entry.component';
import { HistoryDirective } from './historycomponent/history.directive';
import { TagRestApiService } from './services/tag-rest-api.service';


@NgModule({
  imports:      [ 
    HttpClientModule,
    BrowserModule, 
    FormsModule, 
    AppRoutingModule,
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
    ActivateComponent,
    ComponentDirective,
    HistoryDirective,
    EditEntryComponent
    ],
  providers: [
    CategoryService, 
    CategoryRestApiService,
    EntryService,
    MessagingService,
    TagService,
    EntryAPIService,
    LoginService,
    ApplicationService,
    TagRestApiService
    ],
  bootstrap: [ AppComponent ],
  entryComponents: [
    EditEntryComponent,
    DeleteCategoryComponent, 
    EditCategoryComponent, 
    AddCategoryComponent]
})
export class AppModule { 
  constructor(){
  }
}
