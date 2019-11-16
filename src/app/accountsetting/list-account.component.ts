
import { Component, Input, Output, EventEmitter, AfterViewChecked, AfterViewInit } from '@angular/core';
import { LogUtil } from '../utils/log-util';
import { AccountItem } from '../models/account-item';

@Component({
    selector: 'app-list-accounts',
    templateUrl: './list-account.component.html',
})
export class ListAccountComponent {


    @Input()
    public accounts: AccountItem[];

    @Output()
    public deletePressed = new EventEmitter<AccountItem>();

    @Output()
    public setDecryptionPressed = new EventEmitter<AccountItem>();

    constructor() {
        LogUtil.logInits(this, 'init list account component');
    }

    public onDeletedPressed(aAccount: AccountItem): void {
        LogUtil.info(this, 'onDeletedPressed from list-component');
        this.deletePressed.emit(aAccount);
    }

    public onEncryptionPressed(aAccount: AccountItem): void {
        LogUtil.info(this, 'onEncryptionPressed from list-component -> ' + JSON.stringify(aAccount));
        this.setDecryptionPressed.emit(aAccount);
    }

}
