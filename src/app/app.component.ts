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
import { EncryptionFacade } from './utils/encryption-facade';
import { TagStatisticService } from './services/Tag-statistic.service';
import { TagStatistic } from './models/tagstatistic';
import { AuthenticationFacade } from './utils/authentication-facade';
import { TagStatisticFacade } from './utils/tag-statistic-facade';
import { Tag } from './models/tag';

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

    LogUtil.info(this, "Init Application");

    this.tagStatisticFacade = new TagStatisticFacade();
    this.encryptionFacade = new EncryptionFacade();
    this.authenticationLocalStorage = new AuthenticationFacade();

    this.loginSubscription = this.registerLogedInMessage();
    this.encryptionReadySubscription = this.registerEncryptionReadyMessage();

    if (this.authenticationLocalStorage.isUserCredentialsSaved()) {
      LogUtil.info(this,'Usercredentials are saved')
      let savedUser: User = this.authenticationLocalStorage.getUser();
      this.loginServcie.login(savedUser.name, savedUser.password).subscribe(data => {
        LogUtil.info(this, JSON.stringify(data));
        let newUser = new User();
        newUser.accesstoken = data.accesstoken;
        newUser.name = data.username;
        newUser.email = data.email;
        this.user = newUser;
        this.messageService.publish(new LogedInMessage(newUser));
        applicationService.setCurrentUser(newUser);

        let encryptKey: string = this.encryptionFacade.getEncryptionKey(savedUser);

        if (encryptKey) {
          this.encryptKeyIsValid = true;
          this.applicationService.setEncryptionKey(encryptKey);

          this.tagStatiscticService.getTagStatistic().subscribe( (data: TagStatistic[]) => {
            LogUtil.debug(this, 'Get and perist tagstatistics to localStorage: ' + JSON.stringify(data));
            this.tagStatisticFacade.persistTagStatisctics(savedUser,data);
          });
        }
      });
    }
  }

  public login(): void {
    this.router.navigate(['/login']);
  }

  public logout(): void {
    if (this.user) {
      this.loginServcie.logout(this.user.name, this.user.accesstoken);
    }
    this.authenticationLocalStorage.cleanSavedCredentials();
    this.encryptionFacade.deleteLocalStoredEncryptionKey(this.user);
    this.hideLoginAccount();
    this.router.navigate(['/login']);
  }

  private showLoginAccount(): void {
    this.isLogedIn = true;
  }

  private hideLoginAccount(): void {
    this.isLogedIn = false;
  }

  private registerLogedInMessage(): Subscription {
    return this.messageService
      .of(LogedInMessage)
      .subscribe((message: LogedInMessage) => {
        this.user = message.getUser();
        this.applicationService.setCurrentUser(this.user);
        this.showLoginAccount();
      });;
  }

  private registerEncryptionReadyMessage(): Subscription {
    return this.messageService
      .of(EncryptionReadyMessage)
      .subscribe(data => {
        this.encryptKeyIsValid = true;
        this.applicationService.setEncryptionKey(this.encryptionFacade.getEncryptionKey(this.applicationService.getCurrentUser()));
      });
  }

  public ngOnDestroy() {
    this.loginSubscription.unsubscribe();
    this.encryptionReadySubscription.unsubscribe();
  }

}
