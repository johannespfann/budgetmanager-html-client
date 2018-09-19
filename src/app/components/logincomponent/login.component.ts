import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

import { LogUtil } from '../../utils/log-util';
import { LoginService } from '../../rest/login.service';
import { MessagingService } from '../../messages/message.service';
import { LogedInMessage } from '../../messages/logedin-message';
import { User } from '../../models/user';
import { AuthenticationFacade } from '../../utils/authentication-facade';
import { ApplicationService } from '../../application/application.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    public identifier: string;

    public password: string;


    private authenticationLocalStorage: AuthenticationFacade;


    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private loginService: LoginService,
        private messageService: MessagingService,
        private appService: ApplicationService) {

        LogUtil.info(this, 'Init LoginComponent');
            this.authenticationLocalStorage = new AuthenticationFacade();
        this.identifier = route.snapshot.paramMap.get('email');
    }

    public login(): void {
        LogUtil.info(this, 'pressed login');

        if (!this.password) {
            return;
        }

        const baseUrl = this.appService.getBaseUrl();

        this.loginService.login(baseUrl, this.identifier, this.password).subscribe( data => {
            const user: User = new User();
            LogUtil.info(this, JSON.stringify(data));
            user.name = data.username;
            user.email = data.email;
            user.password = this.password;
            user.accesstoken = data.accesstoken;

            LogUtil.info(this, '## Erhalte Login-Response ## ');
            LogUtil.info(this, 'Username   : ' + user.name);
            LogUtil.info(this, 'Email      : ' + user.email);
            LogUtil.info(this, 'accesstoken: ' + user.accesstoken);

            this.authenticationLocalStorage.saveUser(user);
            this.messageService.publish(new LogedInMessage(user));
        });
    }
}
