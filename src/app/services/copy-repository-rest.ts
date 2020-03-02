import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApplicationService } from "../application/application.service";
import { User } from "../models/user";
import { Observable } from "rxjs";
import { Entry } from "../models/entry";
import { AccountItem } from "../models/account-item";
import { StandingOrder } from "../models/standingorder";
import { V2Entry } from "../models/v2entry";
import { V2StandingOrder } from "../models/v2standingorder";

@Injectable()
export class CopyRepositoryRest {

    private baseURL;

    constructor(
        private applicationService: ApplicationService,
        private httpClient: HttpClient) {
            this.baseURL = applicationService.getBaseUrl();
    }

    public addEntries(aUser: User, aAccountItem: AccountItem, entries: Entry[]) : Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);

        const requestURL = this.baseURL + 'backup/owner/' + aUser.name + '/account/' + aAccountItem.account.hash + '/copy/entries';

        let v2Entries = new Array<V2Entry>();

        entries.forEach( entry => {
            let v2entry = new V2Entry();
            v2entry.hash = entry.hash;
            v2entry.amount = entry.amount;
            v2entry.createdAt = entry.created_at;
            v2entry.currency = entry.currency;
            v2entry.memo = entry.memo;

            let simpleTags: string[] = [];

            simpleTags = entry.tags.map( tag => {
                return tag.name;
            });

            v2entry.tags = simpleTags;
            v2Entries.push(v2entry);
        });

        return this.httpClient.post(requestURL, v2Entries, { headers : headers});
    }

    public addStandingOrders(aUser: User, aAccountItem: AccountItem, standingOrders: StandingOrder[]) : Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);

        let v2StandingOrders: V2StandingOrder[] = [];


        standingOrders.forEach( standingOrder => {

            let v2StandingOrder = new V2StandingOrder();
            v2StandingOrder.hash = standingOrder.hash;
            v2StandingOrder.username = standingOrder.username;
            v2StandingOrder.amount = standingOrder.amount;
            v2StandingOrder.currency = standingOrder.currency;
            v2StandingOrder.memo = standingOrder.memo;
            v2StandingOrder.rotationStrategy = standingOrder.rotation_strategy;
            v2StandingOrder.lastExecuted = standingOrder.last_executed;
            v2StandingOrder.lastModified = standingOrder.start_at;
            v2StandingOrder.startAt = standingOrder.start_at;
            v2StandingOrder.endAt = standingOrder.end_at;

            v2StandingOrder.tags = standingOrder.tags.map( tag => {
                return tag.name;
            });

            v2StandingOrders.push(v2StandingOrder);
        })


        const requestURL = this.baseURL + 'backup/owner/' + aUser.name + '/account/' + aAccountItem.account.hash + '/copy/standingorders';
        return this.httpClient.post(requestURL, v2StandingOrders, { headers : headers});
    }
}

/**
 * 
 *     saveEntries(user: User, accountItem: AccountItem, entries: Entry[]): Observable<any> {
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
 * 
 */