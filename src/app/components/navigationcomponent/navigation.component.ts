import { Component } from '@angular/core';
import { LogUtil } from '../../utils/log-util';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

    public navBarIsOpen: boolean;

    constructor() {
        LogUtil.debug(this, 'init navigation-component');
        this.navBarIsOpen = false;
    }

    public openSidebar(): void {
        LogUtil.info(this, 'open navbar');
        this.navBarIsOpen = true;
    }

    public closeSidebar(): void {
        LogUtil.info(this, 'close navbar');
        this.navBarIsOpen = false;
    }
}
