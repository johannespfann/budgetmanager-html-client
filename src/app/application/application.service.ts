import { LogUtil } from '../utils/log-util';
import { LogedInMessage } from '../messages/logedin-message';
import { MessagingService } from '../messages/message.service';
import { User } from '../models/user';
import { AppConfiguration } from './application-configuration';
import { Observable, concat } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { AuthenticationFacade } from '../utils/authentication-facade';
import { EncryptionFacade } from '../utils/encryption-facade';
import { EncryptSerice } from '../services/encrypt.service';

@Injectable()
export class ApplicationService {

    private user: User;

    // private baseUrl = 'http://pfann.org:8081/budget/';
    private baseUrl = 'http://localhost:8081/budget/';

    private encryptionkey: string;
    private isEncryptionKeyDefined: boolean;
    private authfacade: AuthenticationFacade;
    private encryptionFacade: EncryptionFacade;

    constructor(
        private loginService: LoginService,
        private encryptService: EncryptSerice) {

        LogUtil.info(this, 'Init ApplicationService');
        this.authfacade = new AuthenticationFacade();
        this.encryptionFacade = new EncryptionFacade();
        this.isEncryptionKeyDefined = false;
    }

    public currentUserExists(): boolean {
        if (this.user) {
            return true;
        }
        return false;
    }

    public isEncryptionKeyAlreadyDefined(): boolean {
        return this.isEncryptionKeyDefined;
    }

    public setEncryptionKeyAsDefined(): void {
        this.isEncryptionKeyDefined = true;
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
        this.isEncryptionKeyDefined = true;
        this.encryptionkey = aEncryptionKey;
    }

    public isReadyForRestServices(): boolean {
        LogUtil.info(this, 'isLoggedIn    : ' + this.isLoggedIn());
        LogUtil.info(this, 'isEncryptReady: ' + this.isEncryptionKeyReadyToUse());
        if (this.isLoggedIn() && this.isEncryptionKeyReadyToUse()) {
            return true;
        }
        return false;
    }

    public isLoggedIn(): boolean {
        if (this.user) {
            LogUtil.info(this, 'User is loggedIn ' + this.user.name);
            return true;
        }
        return false;
    }


    public isEncryptionKeyReadyToUse(): boolean {
        LogUtil.info(this, 'setupKey:    : ' + this.isEncryptionKeyDefined);
        if (!this.isEncryptionKeyDefined) {
            return false;
        }
        LogUtil.info(this, 'Key:    : ' + this.encryptionkey);
        if (this.encryptionkey) {
            return true;
        }
        return false;
    }

    public logout(): void {
        this.authfacade.cleanSavedCredentials();
        this.encryptionFacade.deleteLocalStoredEncryptionKey(this.user);

        this.user = null;
        this.encryptionkey = null;
        this.isEncryptionKeyDefined = false;
    }

    public initAppService(): Promise<any> {

        LogUtil.info(this, 'Prepare Application');

        if (!this.authfacade.isUserCredentialsSaved()) {
            LogUtil.info(this, 'No user was saved!');
            return Promise.resolve();
        }

        LogUtil.info(this, 'User ' + this.authfacade.getUserNames() + ' was saved in localstorage!');

        const username = this.authfacade.getUserNames();
        const password = this.authfacade.getPassword();

        return this.loginService.login(this.baseUrl, username , password )
            .pipe(
                map( (data: any) => {
                    LogUtil.info(this, JSON.stringify(data));
                    const user: User = new User();
                    user.name = data.username;
                    user.email = data.email;
                    user.accesstoken = data.accesstoken;
                    this.user = user;
                    return user;
                }),
                switchMap(user => this.encryptService.isEncrypted(this.baseUrl, user)
                    .pipe(
                        tap( (isKeySetuped: boolean) => {
                            LogUtil.info(this, 'EncryptionKey was setup! -> ' + JSON.stringify(isKeySetuped));
                            if ( isKeySetuped ) {
                                this.isEncryptionKeyDefined = true;
                                if (this.encryptionFacade.isEncryptionSaved(user)) {
                                    LogUtil.info(this, 'EncryptionKey was saved!');
                                    this.setEncryptionKey(this.encryptionFacade.getEncryptionKey(user));
                                }
                            } else {
                                this.isEncryptionKeyDefined = false;
                            }
                        })
                    )
                )
            ).toPromise();
    }

}
