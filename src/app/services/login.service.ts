import { Injectable } from "@angular/core";
import { LogUtil } from "../utils/log-util";
import { Observable } from "rxjs/Observable";
import { User } from "../models/user";
import { MessagingService } from "../messages/message.service";
import { LogedInMessage } from "../messages/logedin-message";
import { Router } from "@angular/router";
import { ApplicationService } from "../application/application.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {

    private user: User;

    private accessToken: string;

    private baseURL: String;


    constructor(
        private applicationService: ApplicationService,
        private http: HttpClient,
        private messageService: MessagingService,
        private router: Router) {

        LogUtil.info(this, 'Init LoginService');
        this.baseURL = applicationService.getApplicationConfig().getBaseUrl();
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

    public login(aEmail: String, aPassword: String): void {

        let observable: Observable<any> = this.http.post(this.baseURL + "user/login/" + aEmail, aPassword);
        observable.subscribe(
            data => {
                this.accessToken = data.accesstoken;

                let user: User = new User();
                user.name = data.username;
                user.email = data.email;
                user.accesstoken = this.accessToken;

                LogUtil.info(this, "## Erhalte Response ## ");
                LogUtil.info(this, "Username   : " + user.name);
                LogUtil.info(this, "Email      : " + user.email);
                LogUtil.info(this, "accesstoken: " + user.accesstoken);
                LogUtil.info(this, "accesstoken from data: " + data.accesstoken);

                this.applicationService.setCurrentUser(user);

                this.messageService.publish(new LogedInMessage(user));

                this.router.navigate(['/welcome']);
            });
    }

    public logout(aName: String, accessToken: String): void {
        LogUtil.info(this, "logout user " + aName + " and token " + accessToken);

        let httpHeaders: HttpHeaders = new HttpHeaders();

        httpHeaders = httpHeaders.append("Content-Type", 'application/json');

        this.http.post(this.baseURL + "user/logout/" + aName, accessToken)
            .subscribe((data) => {
                LogUtil.info(this, "ok!");
            });
    }
}