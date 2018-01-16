import { Injectable } from "@angular/core";
import { LogUtil } from "../utils/log-util";
import { Observable } from "rxjs/Observable";
import { User } from "../models/user";
import { HttpClient } from "@angular/common/http";
import { HttpResponse } from "@angular/common/http/src/response";
import { MessagingService } from "./message.service";
import { LogedInMessage } from "./logedin-message";
import { Router } from "@angular/router";

@Injectable()
export class LoginService {

    private user: User;

    private accessToken: string;

    private baseURL: string = "http://192.168.2.103:8081/budget/";
    //private baseURL: string = "http://192.168.2.106:8081/budget/";

    constructor(
        private http: HttpClient,
        private messageService: MessagingService,
        private router: Router) {

        LogUtil.info(this, 'Init LoginService');
    }

    public registerUser(aUser: User, aPassword: String): Observable<any> {
        return this.http.post(this.baseURL + "user/register/" + aUser.name + "/email/" + aUser.email, aPassword);
    }

    public activateUser(aName: String, aCode: String): Observable<any> {
        LogUtil.info(this, "send activationcode for: " + aName + " with " + aCode);
        return this.http.post(this.baseURL + "user/activate/" + aName, aCode);
    }

    public resendActivationEmail(aName: string, aEmail: string): Observable<any> {
        return this.http.post(this.baseURL + "activate/resendemail/username/" + aName + "/email/" + aEmail, "");
    }

    public login(aEmail: string, aPassword: String): boolean {
        
        let observable: Observable<any> = this.http.post(this.baseURL + "user/login/" + aEmail, aPassword);
        observable.subscribe(
            data => {
                this.accessToken = data.accessToken;

                let user: User = new User();
                user.email = data.email;
                user.accesstoken = this.accessToken;
                user.name = data.username;

                LogUtil.info(this, "## Erhalte Response ## ");
                LogUtil.info(this, "Username   : " + data.username);
                LogUtil.info(this, "Email      : " + data.email);
                LogUtil.info(this, "accesstoken: " + data.accesstoken);

                this.messageService.publish(new LogedInMessage(user));

                this.router.navigate(['/welcome']);

            });


        return false;
    }


}