import { Observable } from 'rxjs';
import { User } from '../models/user';
import { LoginV2Service } from '../rest/login-api-v2.service';
import { ApplicationService } from '../application/application.service';
import { Injectable } from '@angular/core';

export class LoginService {

    private baseURL: string;

    constructor(
        private appService: ApplicationService,
        private loginService: LoginV2Service) {
        this.baseURL = appService.getBaseUrl();
    }

    // TODO
    public registerUser(string, aUser: User, aPassword: String): Observable<any> {
        return this.loginService.registerUser(this.baseURL, aUser, aPassword);
    }
    // TODO
    public activateUser(aBaseUrl: string, aName: String, aCode: String): Observable<any> {
        return null;
    }
    // TODO
    public resendActivationEmail(aBaseUrl: string, aName: string, aEmail: string): Observable<any> {
        return null;
    }
    // TODO
    public login(aBaseUrl: string, aEmail: String, aPassword: String): Observable<any> {
        return null;
    }
    // TODO
    public logout(aBaseUrl: string, aName: String, accessToken: String): void {
        return null;
    }

}
