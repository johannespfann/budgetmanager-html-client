import { Injectable } from "@angular/core";
import { LoginService } from "../services/login.service";
import { LogUtil } from "../utils/log-util";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AppConfiguration } from "./application-configuration";
import { User } from "../models/user";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {

    private isLogedIn: boolean;

    private user: User = null;

    constructor(
        private loginService: LoginService) {
    }

    public getCurrentUser(): User {
        return this.user;
    }

    public initAppService(): Promise<any> {

        LogUtil.info(this, 'Start Application');

        let applicationConfiguration: AppConfiguration = new AppConfiguration('http://localhost:8081/budget/');

        let username = localStorage.getItem('username');
        let password = localStorage.getItem('password');

        if (username == null || password == null) {
            //return Promise.resolve();
        }

        return this.loginService.login('jopfann@gmail.com', 'keymaster')
            .pipe(
                map((res: Response) => res)

            ).toPromise()
            .then((data: any) => {
                LogUtil.info(this, 'return response: ' + JSON.stringify(data));
                let newUser = new User();
                newUser.accesstoken = data.accesstoken;
                newUser.name = data.username;
                newUser.email = data.email;
                this.user = newUser;
            }
            
        );
    }


}