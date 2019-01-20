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
      LogUtil.info(this, 'User is not loggedIn');
      this.router.navigate(['/welcome']);
      return;
    }
    this.handleLogedIn();
  }

  public login(): void {
    this.router.navigate(['/login']);
  }

  private handleLogedIn(): void {
    this.user = this.applicationService.getCurrentUser();
    this.showLoginAccount();
    this.navigationComponent.setUserIsLogedIn();
    this.callGetAccount();
  }

  public logout(): void {
    if (this.user) {
      const baseUrl = this.applicationService.getBaseUrl();
      this.loginServcie.logout(baseUrl, this.user.name, this.user.accesstoken);
    }
    this.applicationService.logout();
    this.hideLoginAccount();
    this.userIsLogedOut();
    this.router.navigate(['/welcome']);
  }

  private userIsLogedOut(): void {
    this.navigationComponent.userIsLogedOut();
    this.navigationComponent.userHasNoValidKeys();
  }

  private showLoginAccount(): void {
    this.isLogedIn = true;
  }

  private hideLoginAccount(): void {
    this.isLogedIn = false;
  }


  public onOpenSidebar(): void {
    LogUtil.info(this, 'pressed open navbar');
    this.navigationComponent.openSidebar();
  }

  public onCloseSidebar(): void {
    LogUtil.info(this, 'pressed close navbar');
    this.navigationComponent.closeSidebar();
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

  public callGetAccount(): void {
    this.accountService.getAccounts()
    .subscribe(
      (data: Account[]) => {
        if (data.length === 0) {
          this.navigationComponent.userHasNoValidKeys();
          this.router.navigate(['/noaccount']);
        }
        if (data.length > 0) {
          if (this.isAtLeastOneKeyReady(data)) {
            this.navigationComponent.setUserHashValidKeys();
            this.router.navigate(['/welcome']);
          } else {
            this.navigationComponent.userHasNoValidKeys();
            this.router.navigate(['/accounts']);
          }
        }
      },
      error => { console.log(JSON.stringify(error)); }
      );
  }

  public ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

  private isAtLeastOneKeyReady(aAccounts: Account[]): boolean {
    if (this.accountService.getAllUseableAccounts(this.applicationService.getCurrentUser(), aAccounts).length > 0) {
      return true;
    }
    return false;
  }

}
