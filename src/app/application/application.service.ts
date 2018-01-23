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

    private getAccessToken(): String {
        return this.user.accesstoken;
    }

    private getCurrentUser(): User {
        return this.user;
    }

    public setCurrentUser(aUser: User): void {
        this.user = aUser;
    }

    public getApplicationConfig(): AppConfiguration {
        return new AppConfiguration();
    }

}