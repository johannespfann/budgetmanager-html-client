import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApplicationService } from '../application/application.service';
import { LogUtil } from '../utils/log-util';
import { User } from '../models/user';
import { Account } from '../models/account';

@Injectable()
export class AccountApiService {


    constructor(
        private http: HttpClient,
        private appService: ApplicationService) {
        LogUtil.logInits(this, 'Init AccountApiSerice');
    }

    public getAccounts(aUser: User): Observable<Array<Account>> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);
        const baseUrl = this.appService.getBaseUrl();
        return this.http.get<Array<Account>>(baseUrl + 'account/owner/' + aUser.name + '/all', { headers : headers});
    }

    public addAccount(aUser: User, aAccount: Account): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);
        const baseUrl = this.appService.getBaseUrl();

        LogUtil.info(this, 'HTTP_POST: Add new Account: ' + JSON.stringify(aAccount));
        return this.http.post<any>(baseUrl + 'account/owner/' + aUser.name + '/add', aAccount, { headers : headers});
    }

    public deleteAccount(aUser: User, aAccount: Account): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);
        const baseUrl = this.appService.getBaseUrl();
        return this.http.delete(baseUrl + 'account/owner/' + aUser.name + '/delete/' + aAccount.hash, { headers : headers});
    }

}
