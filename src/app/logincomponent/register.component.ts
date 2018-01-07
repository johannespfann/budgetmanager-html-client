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

    private name;
    private email;
    private password;
    private passwordrepeat;


    constructor(
        private loginService: LoginService,
        private router: Router){
        LogUtil.info(this,'Init RegisterComponent');
    }


    public pressRegister(){

        LogUtil.info(this,'pressed register');
        let user:User = new User();
        
        user.name = "johannes"

        user.email = "johannes.pfann@gmx.net";

        this.password = "keymaster";

        this.loginService.registerUser(user,this.password)
            .subscribe(m => {
                LogUtil.info(this, JSON.stringify(m));
            });

        this.router.navigate(['/bm-activate',user.name]);
    }
}