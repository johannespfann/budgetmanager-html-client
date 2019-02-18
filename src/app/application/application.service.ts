import { LogUtil } from '../utils/log-util';
import { User } from '../models/user';
import { map, tap, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { LoginV2Service } from '../rest/login-api-v2.service';
import { AuthenticationFacade } from '../utils/authentication-facade';
import { environment } from '../../environments/environment';

@Injectable()
export class ApplicationService {

    private user: User;
    private baseUrl = environment.resturl;



    private authfacade: AuthenticationFacade;

    constructor(
        private loginService: LoginV2Service) {

        LogUtil.logInits(this, 'Init ApplicationService');
        this.authfacade = new AuthenticationFacade();
    }

    public getBaseUrl(): string {
        return this.baseUrl;
    }

    public currentUserExists(): boolean {
        if (this.user) {
            return true;
        }
        return false;
    }


    public getEncryptionKey(): string {
        return '';
    }

    public getCurrentUser(): User {
        return this.user;
    }

    public setCurrentUser(aUser: User): void {
        this.user = aUser;
    }


    public isReadyForRestServices(): boolean {
        return this.isLoggedIn();
    }

    public isLoggedIn(): boolean {
        if (this.user) {
            return true;
        }
        return false;
    }

    public logout(): void {
        this.authfacade.cleanSavedCredentials();
        this.user = null;
    }

    public initAppService(): Promise<any> {

        LogUtil.info(this, 'Prepare Application');

        if (!this.authfacade.isUserCredentialsSaved()) {
            LogUtil.info(this, 'No user was saved!');
            return Promise.resolve();
        }

        const username = this.authfacade.getUserNames();
        const password = this.authfacade.getPassword();

        return this.loginService.login(this.baseUrl, username , password )
            .pipe(
                map( (data: any) => {

                    const user: User = new User();
                    user.name = data.username;
                    user.email = data.email;
                    user.password = password;
                    user.accesstoken = data.accesstoken;
                    this.user = user;
                    return user;
                })
            ).toPromise()
            .then( data => data )
            .catch( data => LogUtil.info(this, JSON.stringify(data)) );
    }

}
