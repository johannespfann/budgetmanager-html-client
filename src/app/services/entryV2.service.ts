import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationService } from '../application/application.service';
import { AccountService } from './account-service';
import { LogUtil } from '../utils/log-util';
import { AccountItem } from '../models/account-item';
import { Entry } from '../models/entry';
import { EntryAPIV2Service } from '../rest/entry-api-v2.service';


@Injectable()
export class EntryV2Service {

    constructor(
        private entryApiService: EntryAPIV2Service,
        private appService: ApplicationService,
        private accountService: AccountService ) {
        LogUtil.debug(this, 'Init EntryService');
    }

    public getEntries(accountItem: AccountItem): Observable<Entry[]> {
        if (!this.isReadyToUse(accountItem)) {
            return Observable.create(result => { result.error('No restservice available! getEntries'); });
        }
        return this.entryApiService.getEntries(accountItem, this.appService.getCurrentUser());
    }

    public addEntry(account: AccountItem, aEntry: Entry): Observable<any> {
        if (!this.isReadyToUse(account)) {
            return Observable.create(result => { result.error('No restservice available! addEntry'); });
        }
        LogUtil.info(this, 'Service ready to use and try to persist entry -> '
        + JSON.stringify(aEntry) + ' with Account -> '
        + JSON.stringify(account));
        return this.entryApiService.save(this.appService.getCurrentUser(), account, aEntry);
    }

    public deleteEntry(account: AccountItem, aEntry: Entry): Observable<any> {
        if (!this.isReadyToUse(account)) {
            return Observable.create(result => { result.error('No restservice available! deleteEntry'); });
        }
        return this.entryApiService.delete(this.appService.getCurrentUser(), account, aEntry);
    }

    public update(account: AccountItem, aEntry: Entry): Observable<any> {
        if (!this.isReadyToUse(account)) {
            return Observable.create(result => { result.error('No restservice available! updateEntry'); });
        }
        return this.entryApiService.update(this.appService.getCurrentUser(), account, aEntry);
    }

    public isReadyToUse(accountItem: AccountItem): boolean {
        const isReadyForRestServices = this.appService.isReadyForRestServices();
        const isAccountReadyToUse = this.accountService.isAccountReadyToUse(accountItem);
        LogUtil.info(this, 'IsReadyForRestService: ' + JSON.stringify(isReadyForRestServices));
        LogUtil.info(this, 'isAccountReadyToUse: ' + JSON.stringify(isAccountReadyToUse));
        if (isReadyForRestServices && isAccountReadyToUse) {
            return true;
        }
        return false;
    }

}
