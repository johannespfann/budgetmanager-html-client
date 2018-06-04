import { LogUtil } from '../utils/log-util';
import { LogedInMessage } from '../messages/logedin-message';
import { MessagingService } from '../messages/message.service';
import { User } from '../models/user';
import { AppConfiguration } from './application-configuration';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ApplicationService {

    private user: User;

    //private baseUrl = 'http://pfann.org:8081/budget/';
     private baseUrl = 'http://localhost:8081/budget/';

    private encryptionkey: string;

    constructor() {
        LogUtil.info(this, 'Init ApplicationService');
    }

    public initApplication(): void {
    }

    public currentUserExists(): boolean {
        if (this.user) {
            return true;
        }
        return false;
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

    public isReadyForRestServices(): boolean {
        if (this.isLoggedIn() && this.encryptionKeyReady()){
            return true;
        }
        return false;
    }

    public isLoggedIn(): boolean {
        if (this.user){
            return true;
        }
        return false;
    }

    public encryptionKeyReady(): boolean {
        if (this.encryptionkey){
            return true;
        }
        return false;
    }

}
