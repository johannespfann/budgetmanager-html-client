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
import { MessagingService } from './messages/message.service';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/logincomponent/register.component';
import { ActivateComponent } from './components/logincomponent/activate.component';
import { ApplicationService } from './application/application.service';
import { TagsComponent } from './components/tags';
import { ProfileComponent } from './components/profile/profile.component';
import { EncryptApiSerice } from './rest/encrypt-api.service';
import { TagStatisticService } from './services/tag-statistic.service';
import { TagStatisticRestApiService } from './rest/tag-statistic-api.service';
import { StandingOrderInfoComponent } from './components/standingorderinfocomponent/standing-order-info.component';
import { EntryInfoComponent } from './components/entryinfocomponent/entry-info.component';
import { StandingOrderComponent } from './components/standingordercomponent/standingorder.component';
import { EditStandingOrderComponent } from './components/editstandingordercomponent/edit-standingorder.component';
import { ListEntryComponent } from './components/listentrycomponent/list-entry-component';
import { HistoryEntryComponent } from './components/histcomponent/history-entry.component';
import { EditEntryComponent } from './components/editentrycomponent/edit-entry.component';
import { NavigationComponent } from './components/navigationcomponent/navigation.component';
import { UserService } from './services/user.service';
import { UserApiService } from './rest/user-api.service';
import { FooterComponent } from './components/footer/footer.component';
import { ImpressumComponent } from './components/impressum/impressum.component';
import { DataProtectionComponent } from './components/dataprotection/dataprotection.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContactApiService } from './rest/contact-api.service';
import { ContactService } from './services/contact-service';
import { StandingOrderListComponent } from './components/standingorderlistcomponent/standingorder-list.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginApiService } from './rest/login-api.service';
import { AccountApiService } from './rest/account-api.service';
import { AccountService } from './services/account-service';
import { AccountHelpComponent } from './components/account/account-help.component';
import { AccountComponent } from './components/account/account.component';
import { AddAccountComponent } from './components/account/add-account.component';
import { AccountItemComponent } from './components/account/account-item.component';
import { ListAccountComponent } from './components/account/list-account.component';
import { AccountCachingService } from './services/account-caching-service';
import { EntryService } from './services/entry.service';
import { EntryAPIService } from './rest/entry-api.service';
import { StandingOrderApiService } from './rest/standing-order-api.service';
import { StandingOrderService } from './services/standing-order.service';

export function initApplication(appService: ApplicationService) {
  return () => appService.initAppService();
}

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgxSpinnerModule
  ],
  declarations: [
    AppComponent,
    ProfileComponent,
    WelcomeComponent,
    AddEntryComponent,
    PageNotFoundComponent,
    BalanceComponent,
    LoginComponent,
    RegisterComponent,
    ActivateComponent,
    TagsComponent,
    StandingOrderInfoComponent,
    EntryInfoComponent,
    StandingOrderComponent,
    EditStandingOrderComponent,
    ListEntryComponent,
    EditEntryComponent,
    HistoryEntryComponent,
    NavigationComponent,
    ImpressumComponent,
    DataProtectionComponent,
    ContactComponent,
    FooterComponent,
    StandingOrderListComponent,
    PageNotFoundComponent,
    AccountHelpComponent,
    AccountComponent,
    AddAccountComponent,
    AccountItemComponent,
    ListAccountComponent
  ],
  providers: [
    UserApiService,
    UserService,
    MessagingService,
    LoginApiService,
    EncryptApiSerice,
    ApplicationService,
    { provide: APP_INITIALIZER, useFactory: initApplication, deps: [ApplicationService], multi: true },
    TagStatisticService,
    TagStatisticRestApiService,
    ContactService,
    ContactApiService,
    AccountApiService,
    AccountCachingService,
    AccountService,
    EntryAPIService,
    EntryService,
    StandingOrderApiService,
    StandingOrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
