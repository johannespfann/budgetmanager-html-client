
import { Component } from '@angular/core';
import { LogUtil } from '../../utils/log-util';

@Component({
    selector: 'app-add-account',
    templateUrl: './add-account.component.html',
    styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent {

    constructor() {
        LogUtil.info(this, 'init add-account-component');
    }

}
