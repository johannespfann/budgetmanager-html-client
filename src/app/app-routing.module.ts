import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './components/welcomecomponent/welcome.component';
import { AddEntryComponent } from './components/addentrycomponent/add-entry.component';
import { PageNotFoundComponent } from './components/errorcomponents/page-not-found.component';
import { LoginComponent } from './components/logincomponent/login.component';
import { BalanceComponent } from './components/balancecomponent/balance.component';
import { RegisterComponent } from './components/logincomponent/register.component';
import { ActivateComponent } from './components/logincomponent/activate.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StandingOrderComponent } from './components/standingordercomponent/standingorder.component';
import { HistoryEntryComponent } from './components/histcomponent/history-entry.component';
import { EncryptionComponent } from './components/profile/encryption.component';
// standingorder
const appRoutes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'standingorder', component: StandingOrderComponent},
  { path: 'newentry', component: AddEntryComponent },
  { path: 'balance', component: BalanceComponent },
  { path: 'history', component: HistoryEntryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:email', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'encrypt', component: EncryptionComponent },
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
