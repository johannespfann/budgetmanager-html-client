import { Component } from '@angular/core';
import { LogUtil } from '../../utils/log-util';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

    public navBarIsOpen: boolean;
    public userIsLogedIn: boolean;
    public userHasValidKeys: boolean;

    constructor() {
        LogUtil.debug(this, 'init navigation-component');
        this.navBarIsOpen = false;
        this.userIsLogedIn = false;
        this.userHasValidKeys = false;
    }

    public setUserIsLogedIn(): void {
        this.userIsLogedIn = true;
    }

    public setUserHashValidKeys(): void {
        this.userHasValidKeys = true;
    }

    public userIsLogedOut(): void {
        this.userIsLogedIn = false;
    }

    public userHasNoValidKeys(): void {
        this.userHasValidKeys = false;
    }

    public openSidebar(): void {

        LogUtil.debug(this, 'Inside Navigation');
        LogUtil.debug(this, '- logedIn : ' + this.userIsLogedIn);
        LogUtil.debug(this, '- validKey: ' + this.userHasValidKeys);

        LogUtil.info(this, 'open navbar');
        this.navBarIsOpen = true;
    }

    public closeSidebar(): void {
        LogUtil.info(this, 'close navbar');
        this.navBarIsOpen = false;
    }
}
