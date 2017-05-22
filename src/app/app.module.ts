import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppComponent }  from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { AddEntryComponent } from "./addentrycomponent/add-entry.component";
import { WelcomeComponent } from "./welcomecomponent/welcome.component";
import { PageNotFoundComponent } from "./errorcomponents/page-not-found.component";
import { LoginComponent } from "./logincomponent/login.component";

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule ],
  declarations: [ 
    AppComponent,
    WelcomeComponent,
    AddEntryComponent,
    PageNotFoundComponent,
    LoginComponent
    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
