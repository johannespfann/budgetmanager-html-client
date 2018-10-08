import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogUtil } from '../utils/log-util';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable()
export class UserApiService {

    constructor(private http: HttpClient) {
        LogUtil.debug(this, 'init user-api-service');
    }

    public getUserInfo(aBaseUrl: string, aUser: User, aAccessToken: string): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aAccessToken);
        return this.http.get(aBaseUrl + 'user/info/' + aUser.name, { headers : headers});
    }

}
