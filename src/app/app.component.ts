import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessagingService } from './messages/message.service';
import { Subscription } from 'rxjs';
import { LogedInMessage } from './messages/logedin-message';
import { LogUtil } from './utils/log-util';
import { User } from './models/user';
import { ApplicationService } from './application/application.service';
import { LoginService } from './rest/login-api.service';

import { EncryptionReadyMessage } from './messages/encryption-ready-message';
import { NavigationComponent } from './components/navigationcomponent/navigation.component';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-budgetmanager',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  @ViewChild(NavigationComponent)
  public navigationComponent: NavigationComponent;

  private loginSubscription: Subscription;

  private encryptionReadySubscription: Subscription;

  public isLogedIn = false;
  public encryptKeyIsValid = false;

  private user: User;

  constructor(
    private router: Router,
    private loginServcie: LoginService,
    private messageService: MessagingService,
    private applicationService: ApplicationService) {

    LogUtil.debug(this, 'Start Application');
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
      this.router.navigate(['/encrypt']);
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
    this.encryptKeyIsValid = true;
    this.navigationComponent.showMenue();
  }

  private hideNavigation(): void {
    this.encryptKeyIsValid = false;
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
        this.applicationService.setCurrentUser(this.user);
        if (!this.applicationService.isEncryptionKeyReadyToUse()) {
          this.showLoginAccount();
          this.router.navigate(['/encrypt']);
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
