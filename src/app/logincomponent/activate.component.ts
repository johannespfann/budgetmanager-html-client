import { Component } from "@angular/core";
import { LogUtil } from "../utils/log-util";
import { ActivatedRoute } from "@angular/router";
import { LoginService } from "../services/login.service";


@Component({
    selector: 'bm-activate',
    templateUrl: './activate.component.html'    
})
export class ActivateComponent{
    
    private username: string;
    private email: string;
    private activationCode: string;

    constructor(
        private route: ActivatedRoute,
        private loginService: LoginService){

        LogUtil.info(this,'Init ActivateComponent');
        LogUtil.info(this,this.username = route.snapshot.paramMap.get('username'));
        LogUtil.info(this,this.username = route.snapshot.paramMap.get('email'));
    }

    public activateUser(): void{
        this.loginService.activateUser(this.username,this.activationCode);
    }
}