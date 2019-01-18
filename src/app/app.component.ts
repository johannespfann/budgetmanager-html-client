import { Component, OnDestroy, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessagingService } from './messages/message.service';
import { Subscription } from 'rxjs';
import { LogedInMessage } from './messages/logedin-message';
import { LogUtil } from './utils/log-util';
import { User } from './models/user';
import { ApplicationService } from './application/application.service';
import { NavigationComponent } from './components/navigationcomponent/navigation.component';
import { LoginV2Service } from './rest/login-api-v2.service';
import { AccountService } from './services/account-service';

@Component({
  selector: 'app-budgetmanager',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, AfterViewInit {



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

  public ngAfterViewInit(): void {
    if (!this.applicationService.isLoggedIn()) {
      LogUtil.info(this, 'User is not loggedIn');
      this.router.navigate(['/welcome']);
      return;
    }

    this.user = this.applicationService.getCurrentUser();
    this.isLogedIn = true;

    LogUtil.info(this, ' before shows');

    this.showLoginAccount();
    this.showNavigation();
  }

  public login(): void {
    this.router.navigate(['/login']);
  }

  public logout(): void {
    if (this.user) {
      const baseUrl = this.applicationService.getBaseUrl();
      this.loginServcie.logout(baseUrl, this.user.name, this.user.accesstoken);
    }
    this.applicationService.logout();
    this.hideLoginAccount();
    this.hideNavigation();
    this.router.navigate(['/welcome']);
  }

  private showLoginAccount(): void {
    this.isLogedIn = true;
  }

  private hideLoginAccount(): void {
    this.isLogedIn = false;
  }

  private showNavigation(): any {
    this.navigationComponent.showMenue();
  }

  private hideNavigation(): void {
    this.navigationComponent.hideMenue();
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
        LogUtil.info(this, 'User is logedIn: ' + JSON.stringify(this.user));
        this.applicationService.setCurrentUser(this.user);

        // TODO
        this.router.navigate(['/welcome']);

        this.accountService.getAccounts()
        .subscribe(
          data => {
            if (data.length === 0) {
              LogUtil.info(this, 'Number of accounts was 0');
              this.router.navigate(['/noaccount']);
            }
            if (data.length > 0) {
              LogUtil.info(this, 'Number of accounts was not 0');
            }
          },
          error => { console.log(JSON.stringify(error)); }
          );

        this.showLoginAccount();
      });
  }



  public ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

}
