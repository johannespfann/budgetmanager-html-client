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

// https://stackoverflow.com/questions/16600509/aes-encrypt-in-cryptojs-and-decrypt-in-coldfusion
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent {

  private loginSubscription: Subscription;

  public isLogedIn: boolean = false;

  private user: User;

  constructor(
    private router: Router,
    private loginServcie: LoginService,
    private messageService: MessagingService,
    private applicationService: ApplicationService) {

    LogUtil.info(this,"Init Application");

    


    // asdf -> {Moi3HD1daz82yC7qGalL/Q==}

    // luxus -> {U2FsdGVkX180F+yhVlzNMvQu+iV3Pz0tIPOWWpoPwsk=}
    // luxus -> {U2FsdGVkX19Jm62vMJdxy716mycN6oPycSAIZLAspDw=}
    // lucus -> {U5ScW5bDP+vVBPrKaB+V/Q==}
    // luxus -> {U5ScW5bDP+vVBPrKaB+V/Q==}
    // luxus -> {U5ScW5bDP+vVBPrKaB+V/Q==}
    // luxus -> {U2FsdGVkX1+wsYc/pNxiof/Yft3xM08BYpiYJxsuDBc=}

    // {BimMGw1o4A9KGCxp6a7MwQ==}
    // {BimMGw1o4A9KGCxp6a7MwQ==}

    // {d6+mvFuS2aCLjzk0SJpvWA==}
    // {8Rini6LOg8y+t/7gqrdaKQ==}
    var text = "luxus";
    var key = "testpw"
    var iv  = CryptoJS.enc.Base64.parse("#base64IV#");

    //HSPHS3zn4MAhEw3GQjLUKQ==
    //HSPHS3zn4MAhEw3GQjLUKQ==
    //HSPHS3zn4MAhEw3GQjLUKQ==

    let value = CryptUtil.encryptStringWithoutSalt(key, text);
    console.log("-> " + value);

    console.log("Stringify encrypted: " + JSON.stringify(value))

    let newValue = CryptUtil.decryptStringWithoutSalt(key, value);
    console.log("--> " + newValue);

    console.log("Stringify result: " + JSON.stringify(newValue))
    




    this.loginSubscription = messageService
      .of(LogedInMessage)
      .subscribe((message: LogedInMessage) => {
        LogUtil.info(this, "Receive message login message");      
        this.user = message.getUser();
        applicationService.setCurrentUser(message.getUser());

        LogUtil.info(this, "Get User of message: " + message.getUser().name + " : " + message.getUser().accesstoken + " : " + message.getUser().email);     
        
        this.showLoginAccount();
      });


      this.loginWithDummyUser();

  }

  /**
   * TODO Delete - just for developing
   */
  private loginWithDummyUser(): any {
    let user: User = new User();
    user.name = "johannes-1234";
    user.email = "johannes@pfann.de"
    user.accesstoken = "123456";
    this.loginServcie.login(user.email,"key");

  }


  public login(): void {
    LogUtil.info(this, "Pressed login");
    this.router.navigate(['/login']);
  }

  public logout(): void {
    LogUtil.info(this, "Pressed logout");
    LogUtil.info(this, "Get User: " + this.user.accesstoken);
    if (this.user) {
      LogUtil.info(this, "logout");
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

  ngOnDestroy() {
    LogUtil.info(this, "unsubsribe loginSubscription");
    this.loginSubscription.unsubscribe();
  }


}
