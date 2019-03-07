import { Component, OnInit, OnDestroy } from '@angular/core';
import { LogUtil } from '../../utils/log-util';
import { MessagingService } from '../../messages/message.service';
import { Subscription } from 'rxjs';
import { NoEncryptedKeyAvailableMessage } from '../../messages/no-encrypted-key-available-message';
import { EncryptionKeyAvailableMessage } from '../../messages/encryption-key-available-message';
import { LogedOutMessage } from '../../messages/logedout-message';
import { LogedInMessage } from '../../messages/logedin-message';
import { SelectAccountItemMessage } from '../../messages/select-accountitem-message';
import { AccountItem } from '../../models/account-item';
import { RefreshSelectedAccountItemMessage } from '../../messages/refresh-selected-accountitem-message';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {

    private accountItem: AccountItem;

    private noEncryptedKeyMessageSubscription: Subscription;
    private logInMessageSubscription: Subscription;
    private logOutMessageSubscription: Subscription;
    private selectAccountItemMessageSubscription: Subscription;
    private refreshSelectAccountItemMessageSubscription: Subscription;
    private encryptionKeyAvailableMessageSubscription: Subscription;

    public accountname = '';
    public navBarIsOpen: boolean;
    public userIsLogedIn: boolean;
    public userHasValidKeys: boolean;
    public accountviewIsVisible = false;

    constructor(
        private messagingService: MessagingService) {
        LogUtil.logInits(this, 'init navigation-component');
        this.navBarIsOpen = false;
        this.userIsLogedIn = false;
        this.userHasValidKeys = false;

        this.noEncryptedKeyMessageSubscription = this.registerNoEncryptedKeyMessage();
        this.logInMessageSubscription = this.registerLogInMessage();
        this.logOutMessageSubscription = this.registerLogOutMessage();
        this.selectAccountItemMessageSubscription = this.registerSelectAccountItemMessage();
        this.refreshSelectAccountItemMessageSubscription = this.registerRefreshSelectAccountItemMessage();
        this.encryptionKeyAvailableMessageSubscription = this.registerEncryptionKeyAvailableMessage();
    }

    public ngOnInit(): void {
        // on init -> registrieren würde hier nicht gehen ... ?
    }

    public ngOnDestroy(): void {
        this.noEncryptedKeyMessageSubscription.unsubscribe();
        this.logInMessageSubscription.unsubscribe();
        this.logOutMessageSubscription.unsubscribe();
        this.selectAccountItemMessageSubscription.unsubscribe();
        this.refreshSelectAccountItemMessageSubscription.unsubscribe();
        this.encryptionKeyAvailableMessageSubscription.unsubscribe();
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
        return this.messagingService.of(new NoEncryptedKeyAvailableMessage()).subscribe(
            message => {
            LogUtil.logMessages(this, 'received ' + NoEncryptedKeyAvailableMessage.name);
            this.userHasValidKeys = false;
          }
        );
      }

    private registerEncryptionKeyAvailableMessage(): Subscription {
        LogUtil.logMessages(this, 'register ' + EncryptionKeyAvailableMessage.name);
        return this.messagingService.of(new EncryptionKeyAvailableMessage()).subscribe(
            message => {
                LogUtil.logMessages(this, 'received ' + EncryptionKeyAvailableMessage.name);
                this.userHasValidKeys = true;
            }
        );
    }

    private registerLogOutMessage(): Subscription {
        LogUtil.logMessages(this, 'register ' + LogedOutMessage.name);
        return this.messagingService.of(new LogedOutMessage()).subscribe(
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
        return this.messagingService.of(new LogedInMessage(null)).subscribe(
            message => {
                LogUtil.logMessages(this, 'received ' + LogedInMessage.name);
                this.navBarIsOpen = false;
                this.userIsLogedIn = true;
            }
        );
    }

    private registerSelectAccountItemMessage(): Subscription {
        LogUtil.logMessages(this, 'register ' + SelectAccountItemMessage.name);
        return this.messagingService.of(new SelectAccountItemMessage(null)).subscribe(
            (message: SelectAccountItemMessage) => {
                LogUtil.logMessages(this, 'received ' + SelectAccountItemMessage.name);
                this.accountItem = message.getAccountItem();
                this.accountname = this.accountItem.account.name;
                this.accountviewIsVisible = true;
            }
        );
    }

    private registerRefreshSelectAccountItemMessage(): Subscription {
        LogUtil.logMessages(this, 'register ' + SelectAccountItemMessage.name);
        return this.messagingService.of(new RefreshSelectedAccountItemMessage()).subscribe(
            (message: RefreshSelectedAccountItemMessage) => {
                LogUtil.logMessages(this, 'received ' + SelectAccountItemMessage.name);
                this.accountviewIsVisible = false;
                this.accountItem = null;
                this.accountname = '';
            }
        );
    }

}
