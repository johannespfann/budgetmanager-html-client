import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { WelcomeComponent } from "./welcomecomponent/welcome.component";
import { AddEntryComponent } from "./addentrycomponent/add-entry.component";
import { PageNotFoundComponent } from "./errorcomponents/page-not-found.component";
import { LoginComponent } from "./logincomponent/login.component";
import { BalanceComponent } from "./balancecomponent/balance.component";
import { CategoryComponent } from "./categorycomponent/category.component";
import { HistoryComponent } from "./historycomponent/history.component";
import { RegisterComponent } from './logincomponent/register.component';
import { ActivateComponent } from './logincomponent/activate.component';

const appRoutes: Routes = [
  { path: 'welcome',            component: WelcomeComponent },
  { path: 'newentry', component: AddEntryComponent },
  { path: 'balance', component: BalanceComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:email', component: LoginComponent },
  { path: 'bm-register', component: RegisterComponent},
  { path: 'bm-activate/:username/email/:email', component: ActivateComponent},
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