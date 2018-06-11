import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AddEntryComponent } from './addentrycomponent/add-entry.component';
import { WelcomeComponent } from './welcomecomponent/welcome.component';
import { PageNotFoundComponent } from './errorcomponents/page-not-found.component';
import { LoginComponent } from './logincomponent/login.component';
import { BalanceComponent } from './balancecomponent/balance.component';
import { HistoryComponent } from './historycomponent/history.component';
import { EntryService } from './services/entry.service';
import { MessagingService } from './messages/message.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { RegisterComponent } from './logincomponent/register.component';
import { ActivateComponent } from './logincomponent/activate.component';
import { ApplicationService } from './application/application.service';
import { EntryAPIService } from './services/entry.api.service';
import { EditEntryComponent } from './historycomponent/edit-entry.component';
import { HistoryDirective } from './historycomponent/history.directive';
import { RotationEntryService } from './services/rotation-entry.service';
import { RotationEntryRestApiService } from './services/rotation-entry-rest-api.service';
import { RotationEntryComponent } from './rotationentrycomponent/rotation-entry.component';
import { TagsComponent } from './tags';
import { RotationEntryEditComponent } from './rotationentrycomponent/rotation-entry-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { EncryptionComponent } from './profile/encryption.component';
import { FirstAddEncryptionComponent } from './profile/first-add-encryption.component';
import { SetEncryptionKeyComponent } from './profile/set-encryption-key.component';
import { EncryptSerice } from './services/encrypt.service';
import { AppService } from './application/app.service';
import { TagStatisticService } from './services/Tag-statistic.service';
import { TagStatisticRestApiService } from './services/tag-statistic-rest-api.service';
import { StandingOrderComponent } from './entrycomponent/standing-order.component';
import { EntryComponent } from './entrycomponent/entry.component';

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
