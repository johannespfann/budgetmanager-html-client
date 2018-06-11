import { Injectable } from '@angular/core';
import { LogUtil } from '../utils/log-util';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { MessagingService } from '../messages/message.service';
import { LogedInMessage } from '../messages/logedin-message';
import { Router } from '@angular/router';
import { ApplicationService } from '../application/application.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {

    private user: User;

    private accessToken: string;

    private baseURL: String;


    constructor(
        private http: HttpClient,
        private messageService: MessagingService) {
        LogUtil.info(this, 'Init LoginService');
    }

    public registerUser(aBaseUrl: string, aUser: User, aPassword: String): Observable<any> {
        return this.http.post(aBaseUrl + 'user/register/' + aUser.name + '/email/' + aUser.email, aPassword);
    }

    public activateUser(aBaseUrl: string, aName: String, aCode: String): Observable<any> {
        LogUtil.info(this, 'send activationcode for: ' + aName + ' with ' + aCode);
        return this.http.post(aBaseUrl + 'user/activate/' + aName, aCode);
    }

    public resendActivationEmail(aBaseUrl: string, aName: string, aEmail: string): Observable<any> {
        return this.http.post(aBaseUrl + 'activate/resendemail/username/' + aName + '/email/' + aEmail, '');
    }

    public login(aBaseUrl: string, aEmail: String, aPassword: String): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aEmail + ':' + aPassword);
        return this.http.get(aBaseUrl + 'user/login/' + aEmail, { headers : headers});
    }

    public logout(aBaseUrl: string, aName: String, accessToken: String): void {
        LogUtil.info(this, 'logout user ' + aName + ' and token ' + accessToken);
        let httpHeaders: HttpHeaders = new HttpHeaders();
        httpHeaders = httpHeaders.append('Content-Type', 'application/json');
        this.http.post(aBaseUrl + 'user/logout/' + aName, accessToken)
            .subscribe((data) => {
                LogUtil.info(this, 'ok!');
            });
    }
}
