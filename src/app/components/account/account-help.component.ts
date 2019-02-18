import { Component } from '@angular/core';
import { LogUtil } from '../../utils/log-util';


@Component({
    selector: 'app-account-help',
    templateUrl: './account-help.component.html',
    styleUrls: ['./account-help.component.css']
})
export class AccountHelpComponent {

    constructor() {
        LogUtil.logInits(this, 'init account-help-component');
    }

}
