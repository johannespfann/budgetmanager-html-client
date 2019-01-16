import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { LogUtil } from '../../utils/log-util';
import { LoginService } from '../../rest/login-api.service';
import { User } from '../../models/user';
import { ApplicationService } from '../../application/application.service';
import { LoginV2Service } from '../../rest/login-api-v2.service';


@Component({
    selector: 'app-bm-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent{

    public name: string;
    public email: string;
    public password: string;
    public passwordrepeat: string;
    public showPasswordIsIncorrectMessage: boolean;
    public showCommonAlert = false;
    public showEmailConflictAlert = false;


    constructor(
        private appService: ApplicationService,
        private loginService: LoginService,
        private loginV2Service: LoginV2Service,
        private router: Router) {
            this.showPasswordIsIncorrectMessage = false;
            this.showCommonAlert = false;
    }


    public pressRegister() {
        const user: User = new User();

        if (!this.inputIsCorrect()) {
            return;
        }

        user.name = this.name;
        user.email = this.email;

        const baseUrl = this.appService.getBaseUrl();

        this.loginV2Service.registerUser(baseUrl, user, this.password)
            .subscribe(
                m => {
                this.router.navigate(['/bm-activate', m.name, 'email', user.email]);
                },
                (error: Response) => {
                    if (error.status === 409) {
                        this.showEmailConflictAlert = true;
                    } else {
                        this.showCommonAlert = true;
                    }
                }
            );
    }

    public inputIsCorrect(): boolean {
        if (!this.name) {
            LogUtil.info(this, 'name was undefined: ' + this.name);
            return false;
        }

        if (!this.email) {
            LogUtil.info(this, 'email was undefined: ' + this.email);
            this.validateEmail(this.email);
            return false;
        }

        if (!this.password) {
            LogUtil.info(this, 'password was undefined: ' + this.password);
            return false;
        }

        if (!this.passwordrepeat) {
            LogUtil.info(this, ' passwordrepeat was undefined: ' + this.passwordrepeat);
            return false;
        }

        if (this.password !== this.passwordrepeat) {
            LogUtil.info(this, 'password und repeatpw war nicht korrekt');
            this.showPasswordIsIncorrectMessage = true;
            return false;
        }

        return true;
    }

    private validateEmail(email: string): any {
        // TODO throw new Error("Method not implemented.");
    }
}