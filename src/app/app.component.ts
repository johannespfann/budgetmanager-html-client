import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessagingService } from './messages/message.service';
import { Subscription } from 'rxjs';
import { LogedInMessage } from './messages/logedin-message';
import { LogUtil } from './utils/log-util';
import { User } from './models/user';
import { ApplicationService } from './application/application.service';
import { NavigationComponent } from './components/navigationcomponent/navigation.component';
import { LoginApiService } from './rest/login-api.service';
import { AccountService } from './services/account-service';
import { LogedOutMessage } from './messages/logedout-message';
import { AccountItem } from './models/account-item';
import { ModifiedAccountsMessage } from './messages/modified-accounts-message';
import { NoEncryptedKeyAvailableMessage } from './messages/no-encrypted-key-available-message';
import { EncryptionKeyAvailableMessage } from './messages/encryption-key-available-message';
import { StandingOrderJob } from './standingordermanagement/standing-order-job';
import { StandingOrderExecutor } from './standingordermanagement/standing-order-executor';
import { DateSeriesStrategy } from './standingordermanagement/date-series-strategy';
import { EntryService } from './services/entry.service';
import { StandingOrderService } from './services/standing-order.service';
import { MonthlySeriesProducer } from './standingordermanagement/monthly-series-producer';
import { QuarterSeriesProducer } from './standingordermanagement/quarter-series-producer';
import { YearlySeriesProducer } from './standingordermanagement/yearly-series-producer';
import { AddedNewStandingOrderMessage } from './messages/added-new-standing-order-message';

@Component({
  selector: 'app-budgetmanager',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {


  @ViewChild(NavigationComponent)
  public navigationComponent: NavigationComponent;

  private loginMessageSubscription: Subscription;
  private modifiedAccountsMessageSubscription: Subscription;
  private addedNewStandingOrderMessageSubscritption: Subscription;
  private standingOrderJob: StandingOrderJob;
  public isLogedIn = false;
  private user: User;

  constructor(
      private router: Router,
      private loginServcie: LoginApiService,
      private messageService: MessagingService,
      private applicationService: ApplicationService,
      private accountService: AccountService,
      entryService: EntryService,
      standingOrderService: StandingOrderService) {

    LogUtil.debug(this, 'Start Application');
    this.loginMessageSubscription = this.registerLogedInMessage();
    this.modifiedAccountsMessageSubscription = this.registerAccountChanged();
    this.addedNewStandingOrderMessageSubscritption = this.addNewStandingOrderMessage();
    const strategies: DateSeriesStrategy[] = [];
    strategies.push(new MonthlySeriesProducer());
    strategies.push(new QuarterSeriesProducer());
    strategies.push(new YearlySeriesProducer());
    const standingOrderExecutor = new StandingOrderExecutor(strategies);
    this.standingOrderJob = new StandingOrderJob(standingOrderExecutor, entryService, standingOrderService);
  }

  /**
   * functions for lifecycle
   */

  public ngOnInit(): void {
    if (!this.applicationService.isLoggedIn()) {
      LogUtil.debug(this, 'User is not loggedIn');
      this.router.navigate(['/welcome']);
      return;
    }
    this.messageService.publish(new LogedInMessage(this.applicationService.getCurrentUser()));
  }

  public ngOnDestroy(): void {
    this.loginMessageSubscription.unsubscribe();
    this.modifiedAccountsMessageSubscription.unsubscribe();
    this.addedNewStandingOrderMessageSubscritption.unsubscribe();
  }

  /**
   * Functions for buttons
   */

  public pressedLogin(): void {
    this.router.navigate(['/login']);
  }

  public pressedLogout(): void {
    if (this.user) {
      const baseUrl = this.applicationService.getBaseUrl();
      this.loginServcie.logout(baseUrl, this.user.name, this.user.accesstoken);
    }
    this.messageService.publish(new LogedOutMessage());
    this.applicationService.logout();
    this.hideLoginAccount();
    this.router.navigate(['/welcome']);
  }

  public onOpenSidebar(): void {
    this.navigationComponent.openSidebar();
  }

  public onCloseSidebar(): void {
    this.navigationComponent.closeSidebar();
  }

  /**
   * helper
   */

  private handleLogedIn(): void {
    this.user = this.applicationService.getCurrentUser();
    this.showLoginAccount();
  }

  private registerLogedInMessage(): Subscription {
    LogUtil.logMessages(this, 'register ' + LogedInMessage.name);
    return this.messageService
      .of(new LogedInMessage(null))
      .subscribe((message: LogedInMessage) => {
        LogUtil.logMessages(this, 'received ' + LogedInMessage.name);
        this.router.navigate(['/welcome']);
        this.user = message.getUser();
        this.applicationService.setCurrentUser(this.user);
        LogUtil.info(this, 'User is logedIn: ' + JSON.stringify(this.user));
        this.handleLogedIn();
        this.updateCurrentAccountState();
      });
  }

  private registerAccountChanged(): Subscription {
    LogUtil.logMessages(this, 'register ' + ModifiedAccountsMessage.name);
    return this.messageService.of(new ModifiedAccountsMessage()).subscribe(
      message => {
        LogUtil.logMessages(this, 'received ' + ModifiedAccountsMessage.name);
        this.updateCurrentAccountState();
      }
    );
  }

  private addNewStandingOrderMessage(): Subscription {
    LogUtil.logMessages(this, 'register ' + AddedNewStandingOrderMessage.name);
    return this.messageService
    .of(new AddedNewStandingOrderMessage(null))
    .subscribe(
      (message: AddedNewStandingOrderMessage) => {
        LogUtil.logMessages(this, 'received ' + AddedNewStandingOrderMessage.name);
        this.standingOrderJob.executeStandingOrders(message.getAccountItem());
      }
    );
  }

  private updateCurrentAccountState(): void {
    this.accountService.getAllUseableAccounts().subscribe(
      (accounts: AccountItem[] ) => {
        if (accounts.length === 0) {
          this.messageService.publish(new NoEncryptedKeyAvailableMessage());
          this.router.navigate(['/noaccount']);
        } else {
          this.router.navigate(['/accountmenue']);
          this.messageService.publish(new EncryptionKeyAvailableMessage());
        }

      },
      error => { console.log(JSON.stringify(error)); }
    );
  }

  private showLoginAccount(): void {
    this.isLogedIn = true;
  }

  private hideLoginAccount(): void {
    this.isLogedIn = false;
  }

}
