import { Component } from '@angular/core';
import { LogUtil } from '../../utils/log-util';

@Component({
    selector: 'app-dataprotection',
    templateUrl: './dataprotection.component.html',
    styleUrls: ['./dataprotection.component.css']
})
export class DataProtectionComponent {

    constructor() {
        LogUtil.logInits(this, 'init data-protection-component');
    }

}
