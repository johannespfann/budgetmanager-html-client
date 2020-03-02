import { StandingOrderServiceStep } from "./standing-order-service-step";
import { User } from "../models/user";
import { AccountItem } from "../models/account-item";
import { StandingOrder } from "../models/standingorder";
import { Observable } from "rxjs";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { StandingOrderTransformer } from "../rest/standing-order-transformer";
import { StandingOrderServer } from "../models/standing-order-server";
import { map } from "rxjs/operators";


export class StandingOrderRest2Step implements StandingOrderServiceStep {

    constructor(
            private baseUrl: String,
            private httpClient: HttpClient) {
    }

    public addStandingOrder(user: User, accountItem: AccountItem, standingOrder: StandingOrder): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', user.name + ':' + user.accesstoken);

        const baseUrl = this.baseUrl;
        const encryptionKey = accountItem.key;
        const requestURL = baseUrl + 'jobs/owner/' + user.name + '/account/' + accountItem.account.hash + '/add';

        const rotEntryTransformer = new StandingOrderTransformer();
        return this.httpClient.post(requestURL,
            rotEntryTransformer.transformRotationEntry(encryptionKey, standingOrder), { headers : headers});
    }

    public addStandingOrders(user: User, accountItem: AccountItem, standingOrders: StandingOrder[]): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', user.name + ':' + user.accesstoken);

        const baseUrl = this.baseUrl;
        const encryptionKey = accountItem.key;

        const rotEntryTransformer = new StandingOrderTransformer();

        const body: StandingOrderServer[] = [];

        standingOrders.forEach(
            x => {
                body.push(rotEntryTransformer.transformRotationEntry(encryptionKey, x));
            }
        );

        return this.httpClient.post(baseUrl + 'jobs/owner/' + user.name + '/account/' + accountItem.account.hash + '/add/list',
            body, { headers : headers});
    }

    public getStandingOrder(user: User, accountItem: AccountItem): Observable<Array<StandingOrder>> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', user.name + ':' + user.accesstoken);

        const baseUrl = this.baseUrl;
        const encryptionKey = accountItem.key;
        const requestURL = baseUrl + 'jobs/owner/' + user.name + '/account/' + accountItem.account.hash + '/all';

        const rotationEntryTranformer = new StandingOrderTransformer();
        return this.httpClient.get<Array<StandingOrderServer>>(requestURL, { headers : headers})
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

    public deleteStandingOrder(user: User, accountItem: AccountItem, standingOrder: StandingOrder): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', user.name + ':' + user.accesstoken);

        const baseUrl = this.baseUrl;
        const requestURL = baseUrl
            + 'jobs/owner/'
            + user.name
            + '/account/'
            + accountItem.account.hash
            + '/delete/'
            + standingOrder.hash;

        return this.httpClient.delete(requestURL, { headers : headers});
    }

    public updateStandingOrder(user: User, accountItem: AccountItem, standingOrder: StandingOrder): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', user.name + ':' + user.accesstoken);

        const baseUrl = this.baseUrl;
        const requestURL = baseUrl + 'jobs/owner/' + user.name + '/account/' + accountItem.account.hash + '/update';
        const encryptionKey = accountItem.key;

        const rotationEntryTranformer = new StandingOrderTransformer();
        return this.httpClient.patch(requestURL,
            rotationEntryTranformer.transformRotationEntry(encryptionKey, standingOrder),
            { headers : headers});
    }

}