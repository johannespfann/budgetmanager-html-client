import { LogUtil } from "../utils/log-util";
import { Subscription } from "rxjs";
import { LogedInMessage } from "../services/logedin-message";
import { MessagingService } from "../services/message.service";
import { User } from "../models/user";
import { AppConfiguration } from "./application-configuration";
import { Observable } from "rxjs/Observable";

export class ApplicationService {

    private user: User;

    constructor() {
        LogUtil.info(this, "Init ApplicationService");
    }

    public currentUserExists(): boolean {
        if(this.user){
            return true;
        }
        return false
    }

    private getAccessToken(): string {
        return this.user.accesstoken;
    }

    public getCurrentUser(): User {
        LogUtil.info(this, 'User.name  : ' + this.user.name);
        LogUtil.info(this, 'User.email : ' + this.user.email);
        LogUtil.info(this, 'User.token : ' + this.user.accesstoken);
        return this.user;
    }

    public setCurrentUser(aUser: User): void {
        LogUtil.info(this, 'Set user to applicationservice: ' + aUser.name);
        this.user = aUser;
    }

    public getApplicationConfig(): AppConfiguration {
        return new AppConfiguration();
    }

}