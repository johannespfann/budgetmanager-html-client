import { Component } from "@angular/core";
import { LogUtil } from "../utils/log-util";
import { ActivatedRoute } from "@angular/router";
import { LoginService } from "../services/login.service";

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    private identifier: string;

    private password: string;

    private accessToken: string;


    constructor(
        private route: ActivatedRoute,
        private loginService: LoginService) {

        LogUtil.info(this, 'Init LoginComponent');

        this.identifier = route.snapshot.paramMap.get('email');
    }

    public login(): void {
        LogUtil.info(this,"pressed login");
    
        if (!this.password) {
            return;
        }

        this.loginService.login(this.identifier, this.password).subscribe(
            data => {
                LogUtil.info(this, data.accesstoken);
            });      
    }
}