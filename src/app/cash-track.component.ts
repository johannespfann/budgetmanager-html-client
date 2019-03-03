import { LogUtil } from './utils/log-util';
import { Component } from '@angular/core';
import { MessagingService } from './messages/message.service';
import { AccountService } from './services/account-service';
import { AccountItem } from './models/account-item';
import { Router } from '@angular/router';
import { NoEncryptedKeyAvailableMessage } from './messages/no-encrypted-key-available-message';
import { NewAccountItemAvailableMessage } from './messages/new-account-item-available-message';
import { EncryptionKeyAvailableMessage } from './messages/encryption-key-available-message';

@Component({
    selector: 'app-cash-track',
    templateUrl: './cash-track.component.html',
    styleUrls: ['./cash-track.component.css']
  })
export class CashTrackComponent {

    constructor(
        private router: Router,
        private accountService: AccountService,
        private messageService: MessagingService) {
        LogUtil.logInits(this, 'init cash-track-component');
    }

}
