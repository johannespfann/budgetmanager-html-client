import { Component } from '@angular/core';
import { MessagingService } from './messages/message.service';
import { Subscription } from 'rxjs/Subscription';
import { LogedInMessage } from './messages/logedin-message';
import { LogUtil } from './utils/log-util';
import { User } from './models/user';
import { ApplicationService } from './application/application.service';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { CryptUtil } from './utils/crypt-util';
import { EncryptionReadyMessage } from './messages/encryption-ready-message';
import { EncryptLocalStorage } from './utils/encryption-localstorage';
import { TagStatisticService } from './services/Tag-statistic.service';
import { TagStatistic } from './models/tagstatistic';

// https://stackoverflow.com/questions/16600509/aes-encrypt-in-cryptojs-and-decrypt-in-coldfusion
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent {


  private loginSubscription: Subscription;

  private encryptionReadySubscription: Subscription;

  public isLogedIn: boolean = false;

  public encryptKeyIsValid: boolean = false;

  private encryptionLocalStorage: EncryptLocalStorage;

  private user: User;

  constructor(
    private router: Router,
    private loginServcie: LoginService,
    private messageService: MessagingService,
    private applicationService: ApplicationService,
    private tagStatiscticService: TagStatisticService) {

    LogUtil.info(this, "Init Application");

    
    this.encryptionLocalStorage = new EncryptLocalStorage();
    this.loginSubscription = messageService
      .of(LogedInMessage)
      .subscribe((message: LogedInMessage) => {
        this.user = message.getUser();
        applicationService.setCurrentUser(this.user);
        this.showLoginAccount();
      });

    this.encryptionReadySubscription = messageService
      .of(EncryptionReadyMessage)
      .subscribe(data => {
        this.encryptKeyIsValid = true;
        this.applicationService.setEncryptionKey(
          this.encryptionLocalStorage.getEncryptionKey(
            this.applicationService.getCurrentUser()));
      });

    let savedUser: User = this.loadLocalUserCredentials();

    if (savedUser) {
      this.loginServcie.login(savedUser.name, savedUser.password).subscribe(data => {
        LogUtil.info(this, JSON.stringify(data));
        let newUser = new User();
        newUser.accesstoken = data.accesstoken;
        newUser.name = data.username;
        newUser.email = data.email;
        this.user = newUser;
        this.messageService.publish(new LogedInMessage(newUser));
        applicationService.setCurrentUser(newUser);

        let encryptKey: string = this.encryptionLocalStorage.getEncryptionKey(savedUser);

        if (encryptKey) {
          this.encryptKeyIsValid = true;
          this.applicationService.setEncryptionKey(encryptKey);
        }
      });
    }
  }

  private loadLocalUserCredentials(): any {
    let username = localStorage.getItem('username');
    let password = localStorage.getItem('password');

    if (username == null || password == null) {
      return null;
    }

    let user: User = new User();
    user.name = username;
    user.password = password;
    return user;
  }

  public login(): void {
    this.router.navigate(['/login']);
  }

  public logout(): void {
    if (this.user) {
      this.loginServcie.logout(this.user.name, this.user.accesstoken);
    }
    this.hideLoginAccount();
    this.router.navigate(['/login']);
  }

  private showLoginAccount(): void {
    this.isLogedIn = true;
  }

  private hideLoginAccount(): void {
    this.isLogedIn = false;
  }

  public ngOnDestroy() {
    this.loginSubscription.unsubscribe();
    this.encryptionReadySubscription.unsubscribe();
  }

}
