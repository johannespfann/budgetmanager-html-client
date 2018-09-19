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
import { LoginService } from './rest/login.service';
import { RegisterComponent } from './components/logincomponent/register.component';
import { ActivateComponent } from './components/logincomponent/activate.component';
import { ApplicationService } from './application/application.service';
import { EntryAPIService } from './rest/entry.api.service';
import { EditEntryComponent } from './components/historycomponent/edit-entry.component';
import { HistoryDirective } from './components/historycomponent/history.directive';
import { RotationEntryService } from './services/rotation-entry.service';
import { RotationEntryRestApiService } from './rest/rotation-entry-rest-api.service';
import { RotationEntryComponent } from './components/rotationentrycomponent/rotation-entry.component';
import { TagsComponent } from './components/tags';
import { RotationEntryEditComponent } from './components/rotationentrycomponent/rotation-entry-edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EncryptionComponent } from './components/profile/encryption.component';
import { FirstAddEncryptionComponent } from './components/profile/first-add-encryption.component';
import { SetEncryptionKeyComponent } from './components/profile/set-encryption-key.component';
import { EncryptSerice } from './rest/encrypt.service';
import { TagStatisticService } from './services/Tag-statistic.service';
import { TagStatisticRestApiService } from './rest/tag-statistic-rest-api.service';
import { StandingOrderComponent } from './components/entrycomponent/standing-order.component';
import { EntryComponent } from './components/entrycomponent/entry.component';

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
    RotationEntryComponent,
    RotationEntryEditComponent,
    TagsComponent,
    StandingOrderComponent,
    EntryComponent,
  ],
  providers: [
    EntryService,
    MessagingService,
    EntryAPIService,
    LoginService,
    RotationEntryService,
    RotationEntryRestApiService,
    EncryptSerice,
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
