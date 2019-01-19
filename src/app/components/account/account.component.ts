import { Component } from '@angular/core';
import { LogUtil } from '../../utils/log-util';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent {


    constructor() {
        LogUtil.info(this, 'init account-component');
    }

}
