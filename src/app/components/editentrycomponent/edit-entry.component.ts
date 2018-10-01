import { Component } from '@angular/core';
import { LogUtil } from '../../utils/log-util';

@Component({
    selector: 'app-edit-entry',
    templateUrl: './edit-entry.component.html',
    styleUrls: ['./edit-entry.component.css']
})
export class EditEntryComponent {

    constructor() {
        LogUtil.info(this, 'init edit-endry-component');
    }

}
