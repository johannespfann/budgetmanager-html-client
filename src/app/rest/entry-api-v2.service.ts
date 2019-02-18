
import { Injectable } from '@angular/core';
import { LogUtil } from '../utils/log-util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Entry } from '../models/entry';
import { ApplicationService } from '../application/application.service';
import { User } from '../models/user';
import { V2EntryTransformer } from '../utils/v2-entry-transformer';
import { EntryServer } from '../modelv2/entry-server';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountItem } from '../models/account-item';


@Injectable()
export class EntryAPIV2Service {

    private entryTransformer: V2EntryTransformer;

    constructor(
        private http: HttpClient,
        private appService: ApplicationService) {

        LogUtil.logInits(this, 'Init EntryAPIService');
        this.entryTransformer = new V2EntryTransformer();
    }

    public getEntries(accountItem: AccountItem, aUser: User): Observable<Array<Entry>> {

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);

        const baseUrl = this.appService.getBaseUrl();
        const requestUrl = baseUrl + 'entries/owner/' + aUser.name + '/account/' + accountItem.account.hash + '/all';
        const encryptionKey = accountItem.key;

        return this.http.get<Array<EntryServer>>(requestUrl, { headers : headers})
            .pipe(
                map((serverEntries: Array<EntryServer>) => {
                    const entries = new Array<Entry>();
                    LogUtil.info(this, 'Get entries from server: ' + JSON.stringify(serverEntries));

                    serverEntries.forEach((entry: EntryServer) => {
                        entries.push(this.entryTransformer.transformEntryV2Server(encryptionKey, entry));
                    });

                    LogUtil.info(this, 'retured transformed entries: ' + JSON.stringify(entries));
                    return entries;
                })
            );
    }

    public save(aUser: User, accountItem: AccountItem, aEntry: Entry): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);

        LogUtil.info(this, JSON.stringify(aEntry));

        const baseUrl = this.appService.getBaseUrl();
        const encryptionKey = accountItem.key;

        const requestURL = baseUrl + 'entries/owner/' + aUser.name + '/account/' + accountItem.account.hash + '/add';
        const body = this.entryTransformer.transformEntry(encryptionKey, aEntry, aUser.name);

        return this.http.post(requestURL, body, { headers : headers});
    }


    public saveAll(aUser: User, accountItem: AccountItem, aEntries: Entry[]): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);

        LogUtil.info(this, JSON.stringify(aEntries));

        const baseUrl = this.appService.getBaseUrl();
        const encryptionKey = accountItem.key;

        const requestURL = baseUrl + 'entries/owner/' + aUser.name + '/account/' + accountItem.account.hash + '/add/list';

        const body: EntryServer[] = [];

        aEntries.forEach((x: Entry) => {
            body.push(this.entryTransformer.transformEntry(encryptionKey, x, aUser.name));
        });

        return this.http.post(requestURL, body, { headers : headers});
    }


    public delete(aUser: User, aAccount: AccountItem, aEntry: Entry): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);

        const baseUrl = this.appService.getBaseUrl();
        const requestURL = baseUrl + 'entries/owner/' + aUser.name + '/account/' + aAccount.account.hash + '/delete/' + aEntry.hash;

        return this.http.delete(requestURL , { headers : headers});
    }

    public update(aUser: User, accountItem: AccountItem, aEntry: Entry): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);

        const baseUrl = this.appService.getBaseUrl();
        const encryptionKey = accountItem.key;
        const requestURL = baseUrl + 'entries/owner/' + aUser.name + '/account/' + accountItem.account.hash + '/update';

        return this.http.patch(requestURL, this.entryTransformer.transformEntry(encryptionKey, aEntry, aUser.name), { headers : headers});
    }
}
