import { LogUtil } from "../utils/log-util";
import { Subscription } from "rxjs";
import { LogedInMessage } from "../messages/logedin-message";
import { MessagingService } from "../messages/message.service";
import { User } from "../models/user";
import { AppConfiguration } from "./application-configuration";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

@Injectable()
export class ApplicationService {

    private user: User;

    private baseUrl: string = "http://localhost:8081/budget/";

    private encryptionkey: string;

    constructor() {
        LogUtil.info(this, "Init ApplicationService");
    }

    public initApplication(): void {
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
        return this.user;
    }

    public setCurrentUser(aUser: User): void {
        LogUtil.info(this, 'Set user to applicationservice: ' + aUser.name);
        this.user = aUser;
    }

    public getApplicationConfig(): AppConfiguration {
        return new AppConfiguration(this.baseUrl);
    }

    public getEncryptionKey(): string {
        return this.encryptionkey;
    }

    public setEncryptionKey(aEncryptionKey: string): void {
        this.encryptionkey = aEncryptionKey;
    }

}