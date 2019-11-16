import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome.component';
import { PageNotFoundComponent } from './basic/errorcomponents/page-not-found.component';
import { LoginComponent } from './authentication/login.component';
import { MessagingService } from './messages/message.service';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './authentication/register.component';
import { ActivateComponent } from './authentication/activate.component';
import { ApplicationService } from './application/application.service';
import { TagStatisticService } from './services/tag-statistic.service';
import { TagStatisticRestApiService } from './rest/tag-statistic-api.service';;
import { NavigationComponent } from './navigation/navigation.component';
import { UserService } from './services/user.service';
import { UserApiService } from './rest/user-api.service';
import { FooterComponent } from './basic/footer/footer.component';
import { ImpressumComponent } from './basic/impressum/impressum.component';
import { DataProtectionComponent } from './basic/dataprotection/dataprotection.component';
import { ContactComponent } from './basic/contactcomponent/contact.component';
import { ContactApiService } from './rest/contact-api.service';
import { ContactService } from './services/contact-service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginApiService } from './rest/login-api.service';
import { AccountApiService } from './rest/account-api.service';
import { AccountService } from './services/account-service';
import { AccountCachingService } from './services/account-caching-service';
import { EntryService } from './services/entry.service';
import { EntryAPIService } from './rest/entry-api.service';
import { StandingOrderApiService } from './rest/standing-order-api.service';
import { StandingOrderService } from './services/standing-order.service';
import { SharedModule } from './shared/shared.module';
import { AddEntryModule } from './add-entry/add-entry.module';
import { EntryHistoryModule } from './entry-history/entry-history.module';
import { StandingOrderHistoryModule } from './standing-order-history/standing-order-history.module';
import { BalanceModule } from './balance/balance.module';
import { TagRulesModule } from './tag-rules/tag-rules.module';
import { ProfileModule } from './profile/profile.module';
import { AccountWelcomeModule } from './account-welcome/account-welcome.module';
import { AccountModule } from './accountsetting/account.module';
import { UserWelcomeModule } from './user-welcome/user-welcome.module';

export function initApplication(appService: ApplicationService) {
  return () => appService.initAppService();
}

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    AddEntryModule,
    EntryHistoryModule,
    StandingOrderHistoryModule,
    BalanceModule,
    TagRulesModule,
    ProfileModule,
    AccountWelcomeModule,
    AccountModule,
    UserWelcomeModule,
    SharedModule
  ],
  declarations: [
    AppComponent,    
    WelcomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ActivateComponent,
    NavigationComponent,
    ImpressumComponent,
    DataProtectionComponent,
    ContactComponent,
    FooterComponent,
    PageNotFoundComponent
  ],
  providers: [
    UserApiService,
    UserService,
    MessagingService,
    LoginApiService,
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
  
  constructor() {}

}
