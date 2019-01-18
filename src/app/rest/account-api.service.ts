import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApplicationService } from '../application/application.service';
import { LogUtil } from '../utils/log-util';
import { User } from '../models/user';

@Injectable()
export class AccountApiService {

    constructor(
        private http: HttpClient,
        private appService: ApplicationService) {

        LogUtil.info(this, 'Init AccountApiSerice');

    }


    public getAccounts(aUser: User): Observable<Array<Account>> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);
        const baseUrl = this.appService.getBaseUrl();
        return this.http.get<Array<Account>>(baseUrl + 'account/owner/' + aUser.name + '/all', { headers : headers});

    }

}