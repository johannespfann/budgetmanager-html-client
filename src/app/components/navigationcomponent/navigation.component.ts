import { Component } from '@angular/core';
import { LogUtil } from '../../utils/log-util';
import { MessagingService } from '../../messages/message.service';
import { Subscription } from 'rxjs';
import { NoEncryptedKeyAvailableMessage } from '../../messages/no-encrypted-key-available-message';
import { EncryptionKeyAvailableMessage } from '../../messages/encryption-key-available-message';
import { LogedOutMessage } from '../../messages/logedout-message';
import { LogedInMessage } from '../../messages/logedin-message';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

    public navBarIsOpen: boolean;
    public userIsLogedIn: boolean;
    public userHasValidKeys: boolean;

    constructor(
        private messagingService: MessagingService) {
        LogUtil.logInits(this, 'init navigation-component');
        this.navBarIsOpen = false;
        this.userIsLogedIn = false;
        this.userHasValidKeys = false;

        this.registerEncryptionKeyAvailableMessage();
        this.registerNoEncryptedKeyMessage();
        this.registerLogInMessage();
        this.registerLogOutMessage();
    }

    public openSidebar(): void {
        LogUtil.info(this, 'open navbar');
        this.navBarIsOpen = true;
    }

    public closeSidebar(): void {
        LogUtil.info(this, 'close navbar');
        this.navBarIsOpen = false;
    }


    private registerNoEncryptedKeyMessage(): Subscription {
        LogUtil.logMessages(this, 'register ' + NoEncryptedKeyAvailableMessage.name);
        return this.messagingService.of(NoEncryptedKeyAvailableMessage).subscribe(
            message => {
            LogUtil.logMessages(this, 'received ' + NoEncryptedKeyAvailableMessage.name);
            this.userHasValidKeys = false;
          }
        );
      }

    private registerEncryptionKeyAvailableMessage(): Subscription {
        LogUtil.logMessages(this, 'register ' + EncryptionKeyAvailableMessage.name);
        return this.messagingService.of(EncryptionKeyAvailableMessage).subscribe(
            message => {
                LogUtil.logMessages(this, 'received ' + EncryptionKeyAvailableMessage.name);
                this.userHasValidKeys = true;
            }
        );
    }

    private registerLogOutMessage(): Subscription {
        LogUtil.logMessages(this, 'register ' + LogedOutMessage.name);
        return this.messagingService.of(LogedOutMessage).subscribe(
            message => {
                LogUtil.logMessages(this, 'received ' + LogedOutMessage.name);
                this.navBarIsOpen = false;
                this.userIsLogedIn = false;
                this.userHasValidKeys = false;
            }
        );
    }

    private registerLogInMessage(): Subscription {
        LogUtil.logMessages(this, 'register ' + LogedInMessage.name);
        return this.messagingService.of(LogedInMessage).subscribe(
            message => {
                LogUtil.logMessages(this, 'received ' + LogedInMessage.name);
                this.navBarIsOpen = false;
                this.userIsLogedIn = true;
            }
        );
    }
}
