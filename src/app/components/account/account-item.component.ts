import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LogUtil } from '../../utils/log-util';

@Component({
    selector: 'app-account-help',
    templateUrl: './account-help.component.html',
    styleUrls: ['./account-help.component.css']
})
export class AccountItemComponent {


    @Input()
    public account: Account;

    @Output()
    public updatedPressed = new EventEmitter<Account>();


    public owner: string;

    public name: string;

    public encryption_text: string;

    public key: string;


    constructor() {
        LogUtil.info(this, 'init account-item-component');
    }


    public encryptPressed(): void {
        LogUtil.info(this, 'pressed encrypt');
    }






}
