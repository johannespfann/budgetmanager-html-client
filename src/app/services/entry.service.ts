import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationService } from '../application/application.service';
import { AccountService } from './account-service';
import { LogUtil } from '../utils/log-util';
import { AccountItem } from '../models/account-item';
import { Entry } from '../models/entry';
import { EntryRestStep } from './entry-rest.step';
import { HttpClient } from '@angular/common/http';
import { EntryCacheStep } from './entry-cache';
import { EntryServiceStep } from './entry-service-step';


@Injectable()
export class EntryService {

    private entryServiceStep: EntryServiceStep;

    constructor(
            private httpClient: HttpClient,
            private appService: ApplicationService,
            private accountService: AccountService ) {
        LogUtil.logInits(this, 'init EntryService');

        const entryRestStep = new EntryRestStep(appService.getBaseUrl(), httpClient);        
        this.entryServiceStep = new EntryCacheStep(entryRestStep)
    }

    public getEntries(accountItem: AccountItem): Observable<Entry[]> {
        if (!this.isReadyToUse(accountItem)) {
            return Observable.create(result => { result.error('No restservice available! getEntries'); });
        }
        return this.entryServiceStep.getEntries(this.appService.getCurrentUser(), accountItem);
    }

    public getLastHalfYearEntries(accountItem: AccountItem): Observable<Entry[]> {
        if (!this.isReadyToUse(accountItem)) {
            return Observable.create(result => { result.error('No restservice available! getEntries'); });
        }
        
        return this.entryServiceStep.getLasthalfYearEntries(this.appService.getCurrentUser(), accountItem);
    }

    public addEntry(account: AccountItem, aEntry: Entry): Observable<any> {
        if (!this.isReadyToUse(account)) {
            return Observable.create(result => { result.error('No restservice available! addEntry'); });
        }
        return this.entryServiceStep.saveEntry(this.appService.getCurrentUser(), account, aEntry);
    }

    public addEntries(account: AccountItem, aEntries: Entry[]): Observable<any> {
        if (!this.isReadyToUse(account)) {
            return Observable.create(result => { result.error('No restservice available! addEntry'); });
        }
        return this.entryServiceStep.saveEntries(this.appService.getCurrentUser(), account, aEntries);
    }


    public deleteEntry(account: AccountItem, aEntry: Entry): Observable<any> {
        if (!this.isReadyToUse(account)) {
            return Observable.create(result => { result.error('No restservice available! deleteEntry'); });
        }
        return this.entryServiceStep.delete(this.appService.getCurrentUser(), account, aEntry);
    }

    public update(account: AccountItem, aEntry: Entry): Observable<any> {
        if (!this.isReadyToUse(account)) {
            return Observable.create(result => { result.error('No restservice available! updateEntry'); });
        }
        return this.entryServiceStep.update(this.appService.getCurrentUser(), account, aEntry);
    }

    public isReadyToUse(accountItem: AccountItem): boolean {
        const isReadyForRestServices = this.appService.isReadyForRestServices();
        const isAccountReadyToUse = this.accountService.isAccountReadyToUse(accountItem);
        if (isReadyForRestServices && isAccountReadyToUse) {
            return true;
        }
        return false;
    }

}
