
import { Component, Output, EventEmitter } from '@angular/core';
import { LogUtil } from '../../../utils/log-util';
import { Account } from '../../../models/account';
import { CryptUtil } from '../../../utils/crypt-util';
import { AccountItem } from '../../../models/account-item';
import { HashUtil } from '../../../utils/hash-util';

@Component({
    selector: 'app-add-account',
    templateUrl: './add-account.component.html',
    styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent {

    @Output()
    public addNewAccountPressed = new EventEmitter<AccountItem>();

    @Output()
    public cancelPressed = new EventEmitter<any>();

    public name: string;

    public encryption_text: string;

    public encryption_key: string;

    public encryption_key_repeat: string;

    public isInputCompleted = false;


    constructor() {
        LogUtil.logInits(this, 'init add-account-component');
        this.name = '';
        this.encryption_text = '';
        this.encryption_key = '';
        this.encryption_key_repeat = '';
    }


    public pressButtonAddNewAccount(): void {
        const account = new Account();

        if (!this.isNameValid(this.name)) {
            return;
        }

        if (!this.isEncryptionTextValid(this.encryption_text)) {
            return;
        }

        if (!this.areKeysValid(this.encryption_key, this.encryption_key_repeat)) {
            return;
        }

        account.name = this.name;
        account.activated = true;
        account.encryptionText = CryptUtil.encryptString(this.encryption_key, this.encryption_text);
        account.hash = HashUtil.getShortUniqueHash().toString();

        const accountItem = new AccountItem();
        accountItem.account = account;
        accountItem.key = this.encryption_key;

        this.addNewAccountPressed.emit(accountItem);

    }

    private areKeysValid(encryption_key: string, encryption_key_repeat: string): boolean {
        if (encryption_key.length < 3) {
            return false;
        }
        if (encryption_key !== encryption_key_repeat) {
            return false;
        }
        return true;
    }

    private isEncryptionTextValid(encryption_text: string): boolean {
        if (encryption_text.length < 3) {
            return false;
        }
        return true;
    }

    private isNameValid(name: string): boolean {
        if (name.length < 3) {
            return false;
        }
        return true;
    }

    public cancel(): void {
        this.cancelPressed.emit('');
    }

}
