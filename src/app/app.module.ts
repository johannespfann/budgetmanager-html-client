import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { AddEntryComponent } from "./addentrycomponent/add-entry.component";
import { WelcomeComponent } from "./welcomecomponent/welcome.component";
import { PageNotFoundComponent } from "./errorcomponents/page-not-found.component";
import { LoginComponent } from "./logincomponent/login.component";
import { BalanceComponent } from "./balancecomponent/balance.component";
import { HistoryComponent } from "./historycomponent/history.component";
import { EntryService } from "./services/entry.service";
import { MessagingService } from "./messages/message.service";
import { TagService } from './services/tag.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { RegisterComponent } from './logincomponent/register.component';
import { ActivateComponent } from './logincomponent/activate.component';
import { ApplicationService } from './application/application.service';
import { EntryAPIService } from './services/entry.api.service';
import { EditEntryComponent } from './historycomponent/edit-entry.component';
import { HistoryDirective } from './historycomponent/history.directive';
import { TagRestApiService } from './services/tag-rest-api.service';
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

export function initApplication(appService: AppService) {
  console.log("here ...");
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
    TagsComponent
  ],
  providers: [
    EntryService,
    MessagingService,
    TagService,
    EntryAPIService,
    LoginService,
    TagRestApiService,
    RotationEntryService,
    RotationEntryRestApiService,
    EncryptSerice,
    ApplicationService
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
