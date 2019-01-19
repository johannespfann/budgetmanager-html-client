
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LogUtil } from '../../utils/log-util';

@Component({
    selector: 'app-list-accounts',
    templateUrl: './list-account.component.html',
    styleUrls: ['./list-account.component.css']
})
export class ListAccountComponent {


    @Input()
    public accounts: Account[];

    @Output()
    public deletePressed = new EventEmitter<Account>();

    @Output()
    public setDecryptionPressed = new EventEmitter<Account>();

    constructor() {
        LogUtil.info(this, 'init list account component');
    }


    public onDeletedPressed(aAccount: Account): void {
        LogUtil.info(this, 'onDeletedPressed from list-component');
        this.deletePressed.emit(aAccount);
    }

    public onEncryptionPressed(aAccount: Account): void {
        LogUtil.info(this, 'onEncryptionPressed from list-component');
        this.setDecryptionPressed.emit(aAccount);
    }

}