import { NgModule }      from '@angular/core';
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

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule ],
  declarations: [ 
    AppComponent,
    WelcomeComponent,
    AddEntryComponent,
    PageNotFoundComponent,
    BalanceComponent,
    CategoryComponent,
    LoginComponent
    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
