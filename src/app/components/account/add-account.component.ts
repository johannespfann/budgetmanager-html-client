
import { Component, Output, EventEmitter } from '@angular/core';
import { LogUtil } from '../../utils/log-util';
import { Account } from '../../models/account';

@Component({
    selector: 'app-add-account',
    templateUrl: './add-account.component.html',
    styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent {

    @Output()
    public addNewAccountPressed = new EventEmitter<Account>();

    @Output()
    public cancelPressed = new EventEmitter<any>();

    public name: string;

    public encryption_text: string;

    public encryption_key: string;

    public encryption_key_repeat: string;

    public isInputCompleted = false;


    constructor() {
        LogUtil.info(this, 'init add-account-component');
        this.name = '';
        this.encryption_text = '';
        this.encryption_key = '';
        this.encryption_key_repeat = '';
    }


    public pressButtonAddNewAccount(): void {
        const account = new Account();

        account.name = this.name;
        account.encryptionText = this.encryption_text;

        if (!this.isNameValid(this.name)) {
            return;
        }

        if (!this.isEncryptionTextValid(this.encryption_text)) {
            return;
        }

        if (!this.isKeysValid(this.encryption_key, this.encryption_key_repeat)) {
            return;
        }

        this.addNewAccountPressed.emit(account);

    }

    private isKeysValid(encryption_key: string, encryption_key_repeat: string): boolean {
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
