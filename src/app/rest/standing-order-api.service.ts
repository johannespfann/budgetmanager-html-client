import { LogUtil } from '../utils/log-util';
import { Injectable } from '@angular/core';
import { ApplicationService } from '../application/application.service';
import { User } from '../models/user';
import { StandingOrder } from '../models/standingorder';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AccountItem } from '../models/account-item';
import { StandingOrderTransformer } from './standing-order-transformer';
import { StandingOrderServer } from '../models/standing-order-server';

@Injectable()
export class StandingOrderApiService {

    constructor(
        private applicationService: ApplicationService,
        private http: HttpClient) {
        LogUtil.logInits(this, 'init standing-order-api-service');
    }

    public addRotationEntry(aUser: User, aAccountItem: AccountItem, aRotationEntry: StandingOrder): Observable<any> {

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);

        const baseUrl = this.applicationService.getBaseUrl();
        const encryptionKey = aAccountItem.key;
        const requestURL = baseUrl + 'jobs/owner/' + aUser.name + '/account/' + aAccountItem.account.hash + '/add';

        const rotEntryTransformer = new StandingOrderTransformer();
        return this.http.post(requestURL,
            rotEntryTransformer.transformRotationEntry(encryptionKey, aRotationEntry), { headers : headers});
    }

    public addRotationEntries(aUser: User, aAccountItem: AccountItem, aRotationEntries: StandingOrder[]): Observable<any> {

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);

        const baseUrl = this.applicationService.getBaseUrl();
        const encryptionKey = aAccountItem.key;

        const rotEntryTransformer = new StandingOrderTransformer();

        const body: StandingOrderServer[] = [];

        aRotationEntries.forEach(
            x => {
                body.push(rotEntryTransformer.transformRotationEntry(encryptionKey, x));
            }
        );

        return this.http.post(baseUrl + 'jobs/owner/' + aUser.name + '/account/' + aAccountItem.account.hash + '/add/list',
            body, { headers : headers});
    }

    public getRotationEntries(aUser: User, aAccountItem: AccountItem): Observable<Array<StandingOrder>> {

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);

        const baseUrl = this.applicationService.getBaseUrl();
        const encryptionKey = aAccountItem.key;
        const requestURL = baseUrl + 'jobs/owner/' + aUser.name + '/account/' + aAccountItem.account.hash + '/all';

        const rotationEntryTranformer = new StandingOrderTransformer();
        return this.http.get<Array<StandingOrderServer>>(requestURL, { headers : headers})
            .pipe(
                map((entries: StandingOrderServer[]) => {
                    const newEntries: StandingOrder[] = new Array<StandingOrder>();

                    entries.forEach((rotServerEntry: StandingOrderServer) => {
                        newEntries.push(rotationEntryTranformer.transformRotationEntryServer(encryptionKey, rotServerEntry));
                    });

                    return newEntries;
                })
            );
    }

    public deleteRotationEntry(aUser: User, aAccountItem: AccountItem, aRotationEntry: StandingOrder): Observable<any> {

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);

        const baseUrl = this.applicationService.getBaseUrl();
        const requestURL = baseUrl
            + 'jobs/owner/'
            + aUser.name
            + '/account/'
            + aAccountItem.account.hash
            + '/delete/'
            + aRotationEntry.hash;

        return this.http.delete(requestURL, { headers : headers});
    }

    public updateRotationEntry(aUser: User, aAccountItem: AccountItem, aRotationEntry: StandingOrder): Observable<any> {

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);

        const baseUrl = this.applicationService.getBaseUrl();
        const requestURL = baseUrl + 'jobs/owner/' + aUser.name + '/account/' + aAccountItem.account.hash + '/update';
        const encryptionKey = aAccountItem.key;

        const rotationEntryTranformer = new StandingOrderTransformer();
        return this.http.patch(requestURL,
            rotationEntryTranformer.transformRotationEntry(encryptionKey, aRotationEntry),
            { headers : headers});
    }

}
