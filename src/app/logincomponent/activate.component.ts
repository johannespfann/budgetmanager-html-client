import { Component } from "@angular/core";
import { LogUtil } from "../utils/log-util";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "../services/login.service";


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
        private loginService: LoginService){

        LogUtil.info(this,'Init ActivateComponent');
        this.username = route.snapshot.paramMap.get('username');
        this.email = route.snapshot.paramMap.get('email');

        LogUtil.info(this,'Username: ' + this.username);
        LogUtil.info(this,'email: ' + this.email);

    }

    public activateUser(): void{
        LogUtil.info(this,"ActivationCode: " + this.activationCode);
        this.loginService.activateUser(this.username,this.activationCode)
        .subscribe(
            data => {
                LogUtil.info(this,JSON.stringify(data));
                this.router.navigate(['/login',data]);
            },
            error => {
                // TODO
                LogUtil.error(this,'ups: ' + error);
            }
        );
    }

    public resendEmail(): void{
        this.loginService.resendActivationEmail(this.username, this.email)
        .subscribe(
            data => {

            },
            error => {
                LogUtil.error(this,'ups: ' + error);
            }
        );;
    }
}