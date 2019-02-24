import { Injectable } from '@angular/core';
import { LogUtil } from '../utils/log-util';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginApiService {

    constructor(
        private http: HttpClient) {
        LogUtil.logInits(this, 'init login-service');
    }

    public registerUser(aBaseUrl: string, aUser: User, aPassword: String): Observable<any> {
        return this.http.post(aBaseUrl + 'v2/user/register/' + aUser.name + '/email/' + aUser.email, aPassword);
    }

    public activateUser(aBaseUrl: string, aName: String, aCode: String): Observable<any> {
        LogUtil.info(this, 'send activationcode for: ' + aName + ' with ' + aCode);
        return this.http.post(aBaseUrl + 'v2/user/activate/' + aName + '', aCode);
    }

    public resendActivationEmail(aBaseUrl: string, aName: string, aEmail: string): Observable<any> {
        return this.http.post(aBaseUrl + 'v2/user/activate/resendemail/username/' + aName + '/email/' + aEmail, 'bla');
    }

    public login(aBaseUrl: string, aEmail: String, aPassword: String): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aEmail + ':' + aPassword);
        return this.http.get(aBaseUrl + 'v2/user/login/' + aEmail, { headers : headers});
    }

    public logout(aBaseUrl: string, aName: String, accessToken: String): void {
        LogUtil.info(this, 'logout user ' + aName + ' and token ' + accessToken);
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aName + ':' + accessToken);

        this.http.post(aBaseUrl + 'v2/user/logout/' + aName, accessToken, { headers : headers})
            .subscribe((data) => {
                LogUtil.info(this, 'ok!');
            });
    }
}
