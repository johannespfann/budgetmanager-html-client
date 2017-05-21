import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { WelcomeComponent } from "./welcomecomponent/welcome.component";
import { AddEntryComponent } from "./addentrycomponent/add-entry.component";
import { PageNotFoundComponent } from "./errorcomponents/page-not-found.component";

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'addentry-component',        component: AddEntryComponent },
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