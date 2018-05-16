import { Component } from "@angular/core";
import { LogUtil } from "../utils/log-util";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "../services/login.service";
import { MessagingService } from "../messages/message.service";
import { LogedInMessage } from "../messages/logedin-message";
import { User } from "../models/user";

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    public identifier: string;

    public password: string;

    public accessToken: string;


    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private loginService: LoginService,
        private messageService: MessagingService) {

        LogUtil.info(this, 'Init LoginComponent');

        this.identifier = route.snapshot.paramMap.get('email');
    }

    public login(): void {
        LogUtil.info(this,"pressed login");
    
        if (!this.password) {
            return;
        }

        this.loginService.login(this.identifier, this.password).subscribe( data => {
            let user: User = new User();
            user.name = data.username;
            user.email = data.email;
            user.accesstoken = this.accessToken;

            LogUtil.info(this, "## Erhalte Response ## ");
            LogUtil.info(this, "Username   : " + user.name);
            LogUtil.info(this, "Email      : " + user.email);
            LogUtil.info(this, "accesstoken: " + user.accesstoken);
            LogUtil.info(this, "accesstoken from data: " + data.accesstoken);
            
            localStorage.setItem('username',user.name);
            localStorage.setItem('password',this.password);

            this.messageService.publish(new LogedInMessage(user));
            this.router.navigate(['/welcome']);
        })

        
    }
}