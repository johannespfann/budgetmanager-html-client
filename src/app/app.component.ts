import { Component } from '@angular/core';
import { MessagingService } from './services/message.service';
import { Subscription } from 'rxjs/Subscription';
import { LogedInMessage } from './services/logedin-message';
import { LogUtil } from './utils/log-util';
import { User } from './models/user';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent {

  private loginSubscription: Subscription;

  private user: User;
  // private applicationService: ApplicationService

  constructor(
    private messageService: MessagingService
  ) {

    
    this.loginSubscription = messageService
      .of(LogedInMessage)
      .subscribe(
      (message: LogedInMessage) => {
        this.user = message.getUser();
        LogUtil.info(this, "ReceiveMessage: " + message.getUser().name);
        this.showLoginAccount();
      });
  }

  private showLoginAccount(): void {

  }

  private hideLoginAccount(): void {

  }


  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }

}
