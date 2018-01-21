import { LogUtil } from "../utils/log-util";
import { Subscription } from "rxjs";
import { LogedInMessage } from "../services/logedin-message";
import { MessagingService } from "../services/message.service";
import { User } from "../models/user";
import { AppConfiguration } from "./application-configuration";
import { BrowserStorage } from "./browser-storage";
import { Observable } from "rxjs/Observable";




export class ApplicationService {

    private user: User;

    private storage: BrowserStorage;

    constructor() {
        LogUtil.info(this, "Init ApplicationService");
        // get local user if exists and puplish message
        this.storage = new BrowserStorage();
        if (this.storage.isCurrentUserExists()) {
            this.user = this.storage.getCurrentUser();
        }
    }

    public currentUserExists(): boolean {
        return this.storage.isCurrentUserExists();
    }

    private getAccessToken(): String {
        return this.storage.getCurrentUser().getAccessToken();
    }

    private getCurrentUser(): User {
        return this.storage.getCurrentUser();
    }

    private setCurrentUser(aUser: User): void {
        this.storage.persistCurrentUser(aUser);
        this.user = aUser;
    }

    public getApplicationConfig(): AppConfiguration {
        return new AppConfiguration();
    }

}