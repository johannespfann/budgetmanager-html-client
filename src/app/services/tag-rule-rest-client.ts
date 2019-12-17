import { TagRuleServiceStep } from "./tag-rule-service-step";
import { User } from "../models/user";
import { AccountItem } from "../models/account-item";
import { Observable } from "rxjs";
import { TagRule } from "../models/tag-rule";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { element } from "@angular/core/src/render3";
import { tap } from "rxjs/operators";
import { LogUtil } from "../utils/log-util";



export class TagRuleRestclient implements TagRuleServiceStep {

    constructor(
            private baseUrl: string,
            private httpClient: HttpClient) {
        
    }


    getTagRules(user: User, accountItem: AccountItem): Observable<TagRule[]> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', user.name + ':' + user.accesstoken);
        
        const baseUrl = this.baseUrl;
        const requestURL = baseUrl + 'tagrule/owner/' + user.name + '/account/' + accountItem.account.hash + '/all';

        return this.httpClient.get<Array<TagRule>>(requestURL, { headers : headers}).pipe(
            tap( element => LogUtil.info(this, JSON.stringify(element)))
        );
    }

    saveTagRule(user: User, accountItem: AccountItem, tagRule: TagRule): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', user.name + ':' + user.accesstoken);
        
        const baseUrl = this.baseUrl;
        const requestURL = baseUrl + 'tagrule/owner/' + user.name + '/account/' + accountItem.account.hash + '/add';

        return this.httpClient.post(requestURL, tagRule, {headers : headers});
    }

    deleteTagRule(user: User, accountItem: AccountItem, tagRule: TagRule): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', user.name + ':' + user.accesstoken);
        
        const baseUrl = this.baseUrl;
        const requestURL = baseUrl + 'tagrule/owner/' + user.name + '/account/' + accountItem.account.hash + '/delete/' + tagRule.whenTag;

        return this.httpClient.delete(requestURL, {headers: headers});
    }

}