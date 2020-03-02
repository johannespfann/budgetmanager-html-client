import { EntryServiceStep } from "./entry-service-step";
import { AccountItem } from "../models/account-item";
import { User } from "../models/user";
import { Observable } from "rxjs";
import { Entry } from "../models/entry";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogUtil } from "../utils/log-util";
import { map } from "rxjs/operators";
import { EntryTransformer } from "./entry-transformer";
import { EntryServer } from "../models/entry-server";


export class EntryRest2Step implements EntryServiceStep {

    private entryTransformer: EntryTransformer;

    constructor(
            private baseUrl: string,
            private httpClient: HttpClient) {
        LogUtil.logInits(this, 'Init EntryAPIService');
        this.entryTransformer = new EntryTransformer();
    }

    getEntries(user: User, accountItem: AccountItem): Observable<Array<Entry>> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', user.name + ':' + user.accesstoken);

        const requestUrl = this.baseUrl + 'entries/owner/' + user.name + '/account/' + accountItem.account.hash + '/all';
        const encryptionKey = accountItem.key;

        return this.httpClient.get<Array<EntryServer>>(requestUrl, { headers : headers})
            .pipe(
                map((serverEntries: Array<EntryServer>) => {
                    const entries = new Array<Entry>();

                    serverEntries.forEach((entry: EntryServer) => {
                        entries.push(this.entryTransformer.transformEntryV2Server(encryptionKey, entry));
                    });

                    return entries;
                })
            );
    }

    getLasthalfYearEntries(user: User, accountItem: AccountItem): Observable<Array<Entry>> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', user.name + ':' + user.accesstoken);

 
        const requestUrl = this.baseUrl + 'entries/owner/' + user.name + '/account/' + accountItem.account.hash + '/lasthalfyear';
        const encryptionKey = accountItem.key;

        return this.httpClient.get<Array<EntryServer>>(requestUrl, { headers : headers})
            .pipe(
                map((serverEntries: Array<EntryServer>) => {
                    const entries = new Array<Entry>();

                    serverEntries.forEach((entry: EntryServer) => {
                        entries.push(this.entryTransformer.transformEntryV2Server(encryptionKey, entry));
                    });

                    return entries;
                })
            );
    }

    saveEntry(user: User, accountItem: AccountItem, aEntry: Entry): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', user.name + ':' + user.accesstoken);

        const encryptionKey = accountItem.key;

        const requestURL = this.baseUrl + 'entries/owner/' + user.name + '/account/' + accountItem.account.hash + '/add';
        const body = this.entryTransformer.transformEntry(encryptionKey, aEntry, user.name);

        return this.httpClient.post(requestURL, body, { headers : headers});
    }
 
    saveEntries(user: User, accountItem: AccountItem, entries: Entry[]): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', user.name + ':' + user.accesstoken);


        const encryptionKey = accountItem.key;

        const requestURL = this.baseUrl + 'entries/owner/' + user.name + '/account/' + accountItem.account.hash + '/add/list';

        const body: EntryServer[] = [];

        entries.forEach((x: Entry) => {
            body.push(this.entryTransformer.transformEntry(encryptionKey, x, user.name));
        });

        return this.httpClient.post(requestURL, body, { headers : headers});
    }
 
    delete(user: User, accountItem: AccountItem, entry: Entry): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', user.name + ':' + user.accesstoken);

        const requestURL = this.baseUrl + 'entries/owner/' + user.name + '/account/' + accountItem.account.hash + '/delete/' + entry.hash;

        return this.httpClient.delete(requestURL , { headers : headers});
    }
 
    update(user: User, accountItem: AccountItem, entry: Entry): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', user.name + ':' + user.accesstoken);

        const encryptionKey = accountItem.key;
        const requestURL = this.baseUrl + 'entries/owner/' + user.name + '/account/' + accountItem.account.hash + '/update';

        return this.httpClient.patch(requestURL, this.entryTransformer.transformEntry(encryptionKey, entry, user.name), { headers : headers});
    }
}