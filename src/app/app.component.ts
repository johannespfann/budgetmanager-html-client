import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessagingService } from './messages/message.service';
import { Subscription } from 'rxjs';
import { LogedInMessage } from './messages/logedin-message';
import { LogUtil } from './utils/log-util';
import { User } from './models/user';
import { Account } from './models/account';
import { ApplicationService } from './application/application.service';
import { NavigationComponent } from './components/navigationcomponent/navigation.component';
import { LoginV2Service } from './rest/login-api-v2.service';
import { AccountService } from './services/account-service';
import { LogedOutMessage } from './messages/logedout-message';
import { AccountItem } from './models/account-item';

@Component({
  selector: 'app-budgetmanager',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {


  @ViewChild(NavigationComponent)
  public navigationComponent: NavigationComponent;

  private loginSubscription: Subscription;
  public isLogedIn = false;

  private user: User;

  constructor(
      private router: Router,
      private loginServcie: LoginV2Service,
      private messageService: MessagingService,
      private applicationService: ApplicationService,
      private accountService: AccountService) {

    LogUtil.debug(this, 'Start Application');
    this.loginSubscription = this.registerLogedInMessage();
  }

  public ngOnInit(): void {
    if (!this.applicationService.isLoggedIn()) {
      LogUtil.debug(this, 'User is not loggedIn');
      this.router.navigate(['/welcome']);
      return;
    }
    this.messageService.publish(new LogedInMessage(this.applicationService.getCurrentUser()));
    this.handleLogedIn();
  }

  public login(): void {
    this.router.navigate(['/login']);
  }

  private handleLogedIn(): void {
    this.user = this.applicationService.getCurrentUser();

    this.showLoginAccount();
    this.callGetAccount();
  }

  public logout(): void {
    if (this.user) {
      const baseUrl = this.applicationService.getBaseUrl();
      this.loginServcie.logout(baseUrl, this.user.name, this.user.accesstoken);
    }
    this.messageService.publish(LogedOutMessage);
    this.applicationService.logout();
    this.hideLoginAccount();
    this.router.navigate(['/welcome']);
  }

  private showLoginAccount(): void {
    this.isLogedIn = true;
  }

  private hideLoginAccount(): void {
    this.isLogedIn = false;
  }

  public onOpenSidebar(): void {
    this.navigationComponent.openSidebar();
  }

  public onCloseSidebar(): void {
    this.navigationComponent.closeSidebar();
  }

  public callGetAccount(): void {
    this.accountService.getAccounts()
    .subscribe(
      (data: AccountItem[]) => {
        if (data.length === 0) {
          this.router.navigate(['/noaccount']);
        }
        if (data.length > 0) {
          /*if (this.isAtLeastOneKeyReady()) {
            this.router.navigate(['/welcome']);
          } else {
            this.router.navigate(['/accounts']);
          }
          */
        }
      },
      error => { console.log(JSON.stringify(error)); }
      );
  }

  public ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

  private registerLogedInMessage(): Subscription {
    return this.messageService
      .of(LogedInMessage)
      .subscribe((message: LogedInMessage) => {
        this.user = message.getUser();
        this.applicationService.setCurrentUser(this.user);
        LogUtil.info(this, 'User is logedIn: ' + JSON.stringify(this.user));
        this.handleLogedIn();
      });
  }


}
