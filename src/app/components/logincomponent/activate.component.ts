import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

import { LogUtil } from '../../utils/log-util';
import { LoginService } from '../../rest/login-api.service';
import { ApplicationService } from '../../application/application.service';


@Component({
    selector: 'bm-activate',
    templateUrl: './activate.component.html'
})
export class ActivateComponent{

    public username: string;
    public email: string;
    public activationCode: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private loginService: LoginService,
        private appService: ApplicationService){

        LogUtil.info(this, 'Init ActivateComponent');
        this.username = route.snapshot.paramMap.get('username');
        this.email = route.snapshot.paramMap.get('email');

        LogUtil.info(this, 'Username: ' + this.username);
        LogUtil.info(this, 'email: ' + this.email);

    }

    public activateUser(): void {
        LogUtil.info(this, 'ActivationCode: ' + this.activationCode);

        const baseUrl = this.appService.getBaseUrl();
        this.loginService.activateUser(baseUrl, this.username, this.activationCode)
        .subscribe(
            data => {
                this.router.navigate(['/login']);
            },
            error => {
                // TODO
                LogUtil.error(this, 'ups: ' + error);
            }
        );
    }

    public resendEmail(): void {
        const baseUrl = this.appService.getBaseUrl();

        this.loginService.resendActivationEmail(baseUrl, this.username, this.email)
        .subscribe(
            data => {

            },
            error => {
                LogUtil.error(this, 'ups: ' + error);
            }
        );
    }
}