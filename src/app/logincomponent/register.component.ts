import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { LogUtil } from '../utils/log-util';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';
import { stringify } from '@angular/core/src/util';
import { ApplicationService } from '../application/application.service';


@Component({
    selector: 'bm-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent{

    public name: string;
    public email: string;
    public password: string;
    public passwordrepeat: string;


    constructor(
        private appService: ApplicationService,
        private loginService: LoginService,
        private router: Router){
    }


    public pressRegister() {
        const user: User = new User();

        if (!this.inputIsCorrect()){
            return;
        }

        user.name = this.name;
        user.email = this.email;

        const baseUrl = this.appService.getBaseUrl();

        this.loginService.registerUser(baseUrl, user, this.password)
            .subscribe(m => {
                console.log('username ' + JSON.stringify(m));
                this.router.navigate(['/bm-activate', m.name, 'email', user.email]);
            });
    }

    public inputIsCorrect(): boolean {
        if (!this.name) {
            LogUtil.info(this, 'name was undefined: ' + this.name);
            return false;
        }

        if (!this.email) {
            LogUtil.info(this, 'email was undefined: ' + this.email);
            return false;
        }

        if (!this.password) {
            LogUtil.info(this,'password was undefined: ' + this.password);
            return false;
        }

        if (!this.passwordrepeat) {
            LogUtil.info(this, 'passwordrepeat was undefined: ' + this.passwordrepeat);
            return false;
        }

        return true;
    }
}