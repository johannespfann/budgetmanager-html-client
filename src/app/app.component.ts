import { Component, OnDestroy } from '@angular/core';
import { MessagingService } from './messages/message.service';
import { Subscription } from 'rxjs';
import { LogedInMessage } from './messages/logedin-message';
import { LogUtil } from './utils/log-util';
import { User } from './models/user';
import { ApplicationService } from './application/application.service';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { CryptUtil } from './utils/crypt-util';
import { EncryptionReadyMessage } from './messages/encryption-ready-message';
import { EncryptionFacade } from './utils/encryption-facade';
import { TagStatisticService } from './services/Tag-statistic.service';
import { TagStatistic } from './models/tagstatistic';
import { AuthenticationFacade } from './utils/authentication-facade';
import { TagStatisticFacade } from './utils/tag-statistic-facade';
import { Tag } from './models/tag';

// https://stackoverflow.com/questions/16600509/aes-encrypt-in-cryptojs-and-decrypt-in-coldfusion
@Component({
  selector: 'app-budgetmanager',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {

  private loginSubscription: Subscription;

  private encryptionReadySubscription: Subscription;

  public isLogedIn = false;
  public encryptKeyIsValid = false;

  private encryptionFacade: EncryptionFacade;
  private authenticationLocalStorage: AuthenticationFacade;
  private tagStatisticFacade: TagStatisticFacade;

  private user: User;

  constructor(
    private router: Router,
    private loginServcie: LoginService,
    private messageService: MessagingService,
    private applicationService: ApplicationService,
    private tagStatiscticService: TagStatisticService) {

    LogUtil.info(this, 'Start Application');

    this.encryptionFacade = new EncryptionFacade();
    this.authenticationLocalStorage = new AuthenticationFacade();

    this.loginSubscription = this.registerLogedInMessage();
    this.encryptionReadySubscription = this.registerEncryptionReadyMessage();

    if (!applicationService.isLoggedIn()) {
      LogUtil.info(this, 'User is not loggedIn');
      this.router.navigate(['/welcome']);
      return;
    }

    this.user = applicationService.getCurrentUser();
    this.isLogedIn = true;

    if (!applicationService.isEncryptionKeyReadyToUse()) {
      LogUtil.info(this, 'key was nerver set! Navigate to profile ');
      this.router.navigate(['/profile']);
      return;
    }

    this.showLoginAccount();
    this.showNavigation();
  }

  public login(): void {
    this.router.navigate(['/login']);
  }

  public logout(): void {
    if (this.user) {
      const baseUrl = this.applicationService.getApplicationConfig().getBaseUrl();
      this.loginServcie.logout(baseUrl, this.user.name, this.user.accesstoken);
    }
    this.applicationService.logout();
    this.hideLoginAccount();
    this.hideNavigatin();
    this.router.navigate(['/welcome']);
  }

  private showLoginAccount(): void {
    this.isLogedIn = true;
  }

  private hideLoginAccount(): void {
    this.isLogedIn = false;
  }

  private showNavigation(): any {
    this.encryptKeyIsValid = true;
  }

  private hideNavigatin(): void {
    this.encryptKeyIsValid = false;
  }

  private registerLogedInMessage(): Subscription {
    return this.messageService
      .of(LogedInMessage)
      .subscribe((message: LogedInMessage) => {
        this.user = message.getUser();
        this.applicationService.setCurrentUser(this.user);
        if (!this.applicationService.isEncryptionKeyReadyToUse()) {
          this.showLoginAccount();
          this.router.navigate(['/profile']);
        }
      });
  }

  private registerEncryptionReadyMessage(): Subscription {
    return this.messageService
      .of(EncryptionReadyMessage)
      .subscribe(data => {
        this.showLoginAccount();
        this.showNavigation();
        this.router.navigate(['/welcome']);
      });
  }

  public ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
    this.encryptionReadySubscription.unsubscribe();
  }

}
