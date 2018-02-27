import { Component } from '@angular/core';
import { MessagingService } from './messages/message.service';
import { Subscription } from 'rxjs/Subscription';
import { LogedInMessage } from './messages/logedin-message';
import { LogUtil } from './utils/log-util';
import { User } from './models/user';
import { ApplicationService } from './application/application.service';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent {

  private loginSubscription: Subscription;

  private isLogedIn: boolean = false;

  private user: User;

  constructor(
    private router: Router,
    private loginServcie: LoginService,
    private messageService: MessagingService,
    private applicationService: ApplicationService) {

      LogUtil.info(this,"Init Application");

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
