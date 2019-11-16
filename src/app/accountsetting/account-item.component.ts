import { Component, Input, Output, EventEmitter, AfterViewInit, AfterViewChecked, OnInit } from '@angular/core';
import { LogUtil } from '../utils/log-util';
import { AccountItem } from '../models/account-item';
import { CryptUtil } from '../utils/crypt-util';

@Component({
    selector: 'app-account-item',
    templateUrl: './account-item.component.html',
})
export class AccountItemComponent implements OnInit {



    @Input()
    public accountItem: AccountItem;

    @Output()
    public setEcryptionPressed = new EventEmitter<AccountItem>();

    @Output()
    public deletePressed = new EventEmitter<AccountItem>();

    public owner: string;

    public name: string;

    public encryption_text: string;

    public key: string;

    public alreadyValid: boolean;

    public isValidKey: boolean;

    constructor() {
        LogUtil.logInits(this, 'init account-item-component');
    }

    public ngOnInit(): void {
        LogUtil.info(this, 'Show Account-Item: ' + JSON.stringify(this.accountItem) );
        this.validateItem();
    }


    public encrypt(): void {
        LogUtil.info(this, 'pressed encrypt for account :' + this.accountItem.account.name);

        if (CryptUtil.encryptionKeyIsValid(this.key, this.accountItem.account.encryptionText)) {
            this.accountItem.key = this.key;
            this.setEcryptionPressed.emit(this.accountItem);
        }
    }

    public delete(): void {
        LogUtil.info(this, 'pressed deleted for account :' + this.accountItem.account.name);
        this.deletePressed.emit(this.accountItem);
    }

    public validateKey(aKey: string): void {
        const newKey = this.key.trim();
        LogUtil.debug(this, 'key pressed: ' + newKey);
        if (CryptUtil.encryptionKeyIsValid(newKey, this.accountItem.account.encryptionText)) {
            LogUtil.debug(this, 'Key was valid');
            this.isValidKey = true;
            return;
        }
        this.isValidKey = false;

    }

    private validateItem(): void {
        LogUtil.debug(this, 'Validate: ' + JSON.stringify(this.accountItem));
        if (!this.accountItem.key) {
            this.accountItem.key = '';
            this.alreadyValid = false;
            return;
        }

        if (CryptUtil.encryptionKeyIsValid(this.accountItem.key, this.accountItem.account.encryptionText)) {
            this.alreadyValid = true;
            this.key = this.accountItem.key;
            return;
        }

        this.alreadyValid = false;
    }

}
