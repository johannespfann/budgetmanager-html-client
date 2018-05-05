import { Router } from '@angular/router';
import { Component } from "@angular/core";
import { LogUtil } from "../utils/log-util";
import { LoginService } from "../services/login.service";
import { User } from "../models/user";
import { stringify } from "@angular/core/src/util";


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
        private loginService: LoginService,
        private router: Router){
    }


    public pressRegister(){
        let user:User = new User();

        if(!this.inputIsCorrect()){
            return;
        }

        user.name = this.name;
        user.email = this.email;

        this.loginService.registerUser(user,this.password)
            .subscribe(m => {
                LogUtil.info(this, JSON.stringify(m.username));
                this.router.navigate(['/bm-activate',m.username, 'email', user.email]);
            });
    }

    public inputIsCorrect(): boolean {
        if(!this.name){
            LogUtil.info(this,'name was undefined: ' + this.name);
            return false;
        }

        if(!this.email){
            LogUtil.info(this,'email was undefined: ' + this.email);
            return false
        }

        if(!this.password){
            LogUtil.info(this,'password was undefined: ' + this.password);
            return false;
        }

        if(!this.passwordrepeat){
            LogUtil.info(this,'passwordrepeat was undefined: ' + this.passwordrepeat);
            return false;
        }

        return true;
    }
}