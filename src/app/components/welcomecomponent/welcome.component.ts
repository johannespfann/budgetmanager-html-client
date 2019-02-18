import { Component } from '@angular/core';
import { LogUtil } from '../../utils/log-util';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html'
})
export class WelcomeComponent {

    constructor() {
        LogUtil.logInits(this, 'welcome component');
    }
}
