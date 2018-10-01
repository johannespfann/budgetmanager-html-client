import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AddEntryComponent } from './components/addentrycomponent/add-entry.component';
import { WelcomeComponent } from './components/welcomecomponent/welcome.component';
import { PageNotFoundComponent } from './components/errorcomponents/page-not-found.component';
import { LoginComponent } from './components/logincomponent/login.component';
import { BalanceComponent } from './components/balancecomponent/balance.component';
import { HistoryComponent } from './components/historycomponent/history.component';
import { EntryService } from './services/entry.service';
import { MessagingService } from './messages/message.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './rest/login-api.service';
import { RegisterComponent } from './components/logincomponent/register.component';
import { ActivateComponent } from './components/logincomponent/activate.component';
import { ApplicationService } from './application/application.service';
import { EntryAPIService } from './rest/entry-api.service';
import { EditEntryComponent } from './components/historycomponent/edit-entry.component';
import { HistoryDirective } from './components/historycomponent/history.directive';
import { RotationEntryService } from './services/rotation-entry.service';
import { RotationEntryRestApiService } from './rest/orders-api.service';
import { TagsComponent } from './components/tags';
import { ProfileComponent } from './components/profile/profile.component';
import { EncryptionComponent } from './components/profile/encryption.component';
import { FirstAddEncryptionComponent } from './components/profile/first-add-encryption.component';
import { SetEncryptionKeyComponent } from './components/profile/set-encryption-key.component';
import { EncryptApiSerice } from './rest/encrypt-api.service';
import { TagStatisticService } from './services/tag-statistic.service';
import { TagStatisticRestApiService } from './rest/tag-statistic-api.service';
import { StandingOrderInfoComponent } from './components/entryinfocomponent/standing-order-info.component';
import { EntryInfoComponent } from './components/entryinfocomponent/entry-info.component';
import { StandingOrderComponent } from './components/standingordercomponent/standingorder.component';
import { StandingOrderEditComponent } from './components/standingordereditcomponent/standingorder-edit.component';

export function initApplication(appService: ApplicationService) {
  return () => appService.initAppService();
}

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    ProfileComponent,
    EncryptionComponent,
    FirstAddEncryptionComponent,
    SetEncryptionKeyComponent,
    WelcomeComponent,
    AddEntryComponent,
    PageNotFoundComponent,
    BalanceComponent,
    HistoryComponent,
    LoginComponent,
    RegisterComponent,
    ActivateComponent,
    HistoryDirective,
    EditEntryComponent,
    TagsComponent,
    StandingOrderInfoComponent,
    EntryInfoComponent,
    StandingOrderComponent,
    StandingOrderEditComponent
  ],
  providers: [
    EntryService,
    MessagingService,
    EntryAPIService,
    LoginService,
    RotationEntryService,
    RotationEntryRestApiService,
    EncryptApiSerice,
    ApplicationService,
    { provide: APP_INITIALIZER, useFactory: initApplication, deps: [ApplicationService], multi: true },
    TagStatisticService,
    TagStatisticRestApiService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EditEntryComponent
  ]
})
export class AppModule {
  constructor() {
  }
}
