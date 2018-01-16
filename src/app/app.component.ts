import { Component } from '@angular/core';
import { MessagingService } from './services/message.service';
import { Subscription } from 'rxjs/Subscription';
import { LogedInMessage } from './services/logedin-message';
import { LogUtil } from './utils/log-util';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
}) 
export class AppComponent  { 
  
  private loginSubscription: Subscription;

// private applicationService: ApplicationService

  constructor(
    private messageService: MessagingService
    ){

    this.loginSubscription = messageService
    .of(LogedInMessage)
    .subscribe( 
      (data: LogedInMessage) => {
        LogUtil.info(this,"ReceiveMessage: " + data.getUser().name);
    });
  }


  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
}
     
}
