import { LogUtil } from '../utils/log-util';
import { StandingOrderApiService } from '../rest/standing-order-api.service';
import { ApplicationService } from '../application/application.service';
import { RotationEntry } from '../models/rotationentry';
import { Observable } from 'rxjs';
import { AccountItem } from '../models/account-item';
import { Injectable } from '@angular/core';
import { AccountService } from './account-service';

@Injectable()
export class StandingOrderService {

    constructor(
        private accountService: AccountService,
        private rotationEntryRestApiService: StandingOrderApiService,
        private appService: ApplicationService) {
            LogUtil.logInits(this, 'init standing-order-service');
    }

    public addRotationEntry(aAccountItem: AccountItem, aRotationEntry: RotationEntry): Observable<any> {
        if (!this.isReadyToUse(aAccountItem)) {
            return Observable.create(result => { result.error('No restservice available!'); });
        }
        return this.rotationEntryRestApiService.addRotationEntry(this.appService.getCurrentUser(), aAccountItem, aRotationEntry);
    }

    public addStandingOrders(aAccountItem: AccountItem, aStandingOrders: RotationEntry[]): Observable<any> {
        if (!this.isReadyToUse(aAccountItem)) {
            return Observable.create(result => { result.error('No restservice available!'); });
        }
        return this.rotationEntryRestApiService.addRotationEntries(this.appService.getCurrentUser(), aAccountItem, aStandingOrders);
    }

    public getRotationEntries(aAccountItem: AccountItem): Observable<Array<RotationEntry>> {
        if (!this.isReadyToUse(aAccountItem)) {
            return Observable.create(result => { result.error('No restservice available!'); });
        }
        return this.rotationEntryRestApiService.getRotationEntries(this.appService.getCurrentUser(), aAccountItem);
    }

    public deleteRotationEntry(aAccountItem: AccountItem, aRotationEntry: RotationEntry): Observable<any> {
        if (!this.isReadyToUse(aAccountItem)) {
            return Observable.create(result => { result.error('No restservice available!'); });
        }
        return this.rotationEntryRestApiService.deleteRotationEntry(this.appService.getCurrentUser(), aAccountItem , aRotationEntry);
    }

    public updateRotationEntry(aAccountItem: AccountItem, aRotationEntry: RotationEntry): Observable<any> {
        if (!this.isReadyToUse(aAccountItem)) {
            return Observable.create(result => { result.error('No restservice available!'); });
        }
        return this.rotationEntryRestApiService.updateRotationEntry(this.appService.getCurrentUser(), aAccountItem, aRotationEntry);
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

