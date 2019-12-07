
import { Injectable } from '@angular/core';
import { LogUtil } from '../utils/log-util';
import { AccountItem } from '../models/account-item';
import { Observable, of } from 'rxjs';
import { TagRule } from '../models/tag-rule';
import { ApplicationService } from '../application/application.service';

import { TagRuleRestclient } from './tag-rule-rest-client';
import { HttpClient } from '@angular/common/http';
import { TagRuleCache } from './tag-rule.cache';
import { TagRuleServiceStep } from './tag-rule-service-step';
import { AccountService } from './account-service';

@Injectable()
export class TagRuleService {

    private tagRuleService: TagRuleServiceStep;

    constructor(
            private applicationService: ApplicationService,
            private accountService: AccountService,
            private httpClient: HttpClient) {
        LogUtil.logInits(this, "init tag-rule-service");
        
        const tagRuleRestClient = new TagRuleRestclient(applicationService.getBaseUrl(), httpClient); 
        const tagRuleCache = new TagRuleCache(tagRuleRestClient);
        this.tagRuleService = tagRuleCache;
    }

    public getTagRules(accountItem: AccountItem): Observable<TagRule[]> {
        if (!this.isReadyToUse(accountItem)) {
            return Observable.create(result => { result.error('No restservice available! updateEntry'); });
        }
        return this.tagRuleService.getTagRules(this.applicationService.getCurrentUser(), accountItem);
    }

    public saveTagRule(accountItem: AccountItem, tagRule: TagRule): Observable<any> {
        if (!this.isReadyToUse(accountItem)) {
            return Observable.create(result => { result.error('No restservice available! updateEntry'); });
        }
        return this.tagRuleService.saveTagRule(this.applicationService.getCurrentUser(), accountItem, tagRule);
    }

    public deleteTagRule(accountItem: AccountItem, tagRule: TagRule): Observable<any> {
        if (!this.isReadyToUse(accountItem)) {
            return Observable.create(result => { result.error('No restservice available! updateEntry'); });
        }
        return this.tagRuleService.deleteTagRule(this.applicationService.getCurrentUser(), accountItem, tagRule);
    }

    public updateTagRule(accountItem: AccountItem, tagRule: TagRule): Observable<any> {
        if (!this.isReadyToUse(accountItem)) {
            return Observable.create(result => { result.error('No restservice available! updateEntry'); });
        }
        return this.tagRuleService.updateTagRule(this.applicationService.getCurrentUser(), accountItem, tagRule);
    }

    public isReadyToUse(accountItem: AccountItem): boolean {
        const isReadyForRestServices = this.applicationService.isReadyForRestServices();
        const isAccountReadyToUse = this.accountService.isAccountReadyToUse(accountItem);
        if (isReadyForRestServices && isAccountReadyToUse) {
            return true;
        }
        return false;
    }

}