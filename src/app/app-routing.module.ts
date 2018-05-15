import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { WelcomeComponent } from "./welcomecomponent/welcome.component";
import { AddEntryComponent } from "./addentrycomponent/add-entry.component";
import { PageNotFoundComponent } from "./errorcomponents/page-not-found.component";
import { LoginComponent } from "./logincomponent/login.component";
import { BalanceComponent } from "./balancecomponent/balance.component";
import { HistoryComponent } from "./historycomponent/history.component";
import { RegisterComponent } from './logincomponent/register.component';
import { ActivateComponent } from './logincomponent/activate.component';
import { RotationEntryComponent } from './rotationentrycomponent/rotation-entry.component';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'rotationjobs', component: RotationEntryComponent},
  { path: 'newentry', component: AddEntryComponent },
  { path: 'balance', component: BalanceComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:email', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'bm-register', component: RegisterComponent},
  { path: 'bm-activate/:username/email/:email', component: ActivateComponent},
  { path: '',   redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      useHash: true
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}