import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { WelcomeComponent } from "./welcomecomponent/welcome.component";
import { AddEntryComponent } from "./addentrycomponent/add-entry.component";
import { PageNotFoundComponent } from "./errorcomponents/page-not-found.component";
import { LoginComponent } from "./logincomponent/login.component";

const appRoutes: Routes = [
  { path: 'welcome',            component: WelcomeComponent },
  { path: 'newentry', component: AddEntryComponent },
  { path: 'login', component: LoginComponent },
  { path: '',   redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}