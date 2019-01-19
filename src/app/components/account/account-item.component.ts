import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LogUtil } from '../../utils/log-util';

@Component({
    selector: 'app-account-item',
    templateUrl: './account-item.component.html',
    styleUrls: ['./account-item.component.css']
})
export class AccountItemComponent {


    @Input()
    public account: Account;

    @Output()
    public setEcryptionPressed = new EventEmitter<Account>();

    @Output()
    public deletePressed = new EventEmitter<Account>();

    public owner: string;

    public name: string;

    public encryption_text: string;

    public key: string;

    constructor() {
        LogUtil.info(this, 'init account-item-component');
    }

    public encrypt(): void {
        LogUtil.info(this, 'pressed encrypt for account :' + this.account.name);
        this.setEcryptionPressed.emit(this.account);
    }

    public delete(): void {
        LogUtil.info(this, 'pressed deleted for account :' + this.account.name);
        this.deletePressed.emit(this.account);
    }

}
