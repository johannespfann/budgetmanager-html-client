import { LogUtil } from '../utils/log-util';
import { Injectable } from '@angular/core';
import { ApplicationService } from '../application/application.service';
import { User } from '../models/user';
import { RotationEntry } from '../models/rotationentry';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AccountItem } from '../models/account-item';
import { StandingOrderTransformer } from '../utils/standing-order-transformer';
import { StandingOrderServer } from '../modelv2/standing-order-server';

@Injectable()
export class StandingOrderApiService {

    constructor(
        private applicationService: ApplicationService,
        private http: HttpClient) {
        LogUtil.debug(this, 'init standing-order-api-service');
    }

    public addRotationEntry(aUser: User, aAccountItem: AccountItem, aRotationEntry: RotationEntry): Observable<any> {

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);

        const baseUrl = this.applicationService.getBaseUrl();
        const encryptionKey = aAccountItem.key;
        const requestURL = baseUrl + 'jobs/owner/' + aUser.name + '/account/' + aAccountItem.account.hash + '/add';

        const rotEntryTransformer = new StandingOrderTransformer();
        return this.http.post(requestURL,
            rotEntryTransformer.transformRotationEntry(encryptionKey, aRotationEntry), { headers : headers});
    }

    public getRotationEntries(aUser: User, aAccountItem: AccountItem): Observable<Array<RotationEntry>> {

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);

        const baseUrl = this.applicationService.getBaseUrl();
        const encryptionKey = aAccountItem.key;
        const requestURL = baseUrl + 'jobs/owner/' + aUser.name + '/account/' + aAccountItem.account.hash + '/all';

        const rotationEntryTranformer = new StandingOrderTransformer();
        return this.http.get<Array<StandingOrderServer>>(requestURL, { headers : headers})
            .pipe(
                map((entries: StandingOrderServer[]) => {
                    const newEntries: RotationEntry[] = new Array<RotationEntry>();

                    entries.forEach((rotServerEntry: StandingOrderServer) => {
                        newEntries.push(rotationEntryTranformer.transformRotationEntryServer(encryptionKey, rotServerEntry));
                    });

                    LogUtil.info(this, 'Returning orders: ' + JSON.stringify(newEntries));
                    return newEntries;
                })
            );
    }

    public deleteRotationEntry(aUser: User, aAccountItem: AccountItem, aRotationEntry: RotationEntry): Observable<any> {

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

    public updateRotationEntry(aUser: User, aAccountItem: AccountItem, aRotationEntry: RotationEntry): Observable<any> {

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