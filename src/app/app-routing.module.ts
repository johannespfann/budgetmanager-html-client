import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './components/welcomecomponent/welcome.component';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { PageNotFoundComponent } from './components/errorcomponents/page-not-found.component';
import { LoginComponent } from './components/logincomponent/login.component';
import { BalanceComponent } from './balance/balance.component';
import { RegisterComponent } from './components/logincomponent/register.component';
import { ActivateComponent } from './components/logincomponent/activate.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StandingOrderComponent } from './standing-order-history/standingorder.component';
import { HistoryEntryComponent } from './entry-history/history-entry.component';
import { ImpressumComponent } from './components/impressum/impressum.component';
import { DataProtectionComponent } from './components/dataprotection/dataprotection.component';
import { ContactComponent } from './components/contactcomponent/contact.component';
import { AccountHelpComponent } from './components/account/account-help.component';
import { AccountComponent } from './components/account/accountcomponent/account.component';
import { AccountWelcomeComponent } from './components/account/account-welcome.component';
import { AccountMenueComponent } from './components/account/account-menue.component';
import { RulesComponent } from './components/rulescomponent/rules.component';
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
  { path: 'bm-register', component: RegisterComponent},
  { path: 'bm-activate/:username/email/:email', component: ActivateComponent},
  { path: 'kontakt', component: ActivateComponent},
  { path: 'impressum', component: ImpressumComponent},
  { path: 'dataprotection', component: DataProtectionComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'noaccount', component: AccountHelpComponent},
  { path: 'accounts', component: AccountComponent},
  { path: 'accountwelcome', component: AccountWelcomeComponent},
  { path: 'accountmenue', component: AccountMenueComponent},
  { path: 'rules', component: RulesComponent},
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
