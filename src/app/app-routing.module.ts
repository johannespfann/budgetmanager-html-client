import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome.component';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { PageNotFoundComponent } from './basic/errorcomponents/page-not-found.component';
import { LoginComponent } from './authentication/login.component';
import { BalanceComponent } from './balance/balance.component';
import { RegisterComponent } from './authentication/register.component';
import { ActivateComponent } from './authentication/activate.component';
import { ProfileComponent } from './profile/profile.component';
import { StandingOrderComponent } from './standing-order-history/standingorder.component';
import { HistoryEntryComponent } from './entry-history/history-entry.component';
import { ImpressumComponent } from './basic/impressum/impressum.component';
import { DataProtectionComponent } from './basic/dataprotection/dataprotection.component';
import { ContactComponent } from './basic/contactcomponent/contact.component';
import { AccountHelpComponent } from './user-welcome/account-help.component';
import { AccountComponent } from './accountsetting/account.component';
import { AccountWelcomeComponent } from './account-welcome/account-welcome.component';
import { AccountMenueComponent } from './user-welcome/account-menue.component';
import { RulesComponent } from './tag-rules/rules.component';
import { EncryptComponent } from './encrypt/encrypt.component';
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
  { path: 'encrypt', component: EncryptComponent},
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
