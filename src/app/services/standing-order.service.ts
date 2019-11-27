import { LogUtil } from '../utils/log-util';
import { StandingOrderApiService } from '../rest/standing-order-api.service';
import { ApplicationService } from '../application/application.service';
import { StandingOrder } from '../models/standingorder';
import { Observable } from 'rxjs';
import { AccountItem } from '../models/account-item';
import { Injectable } from '@angular/core';
import { AccountService } from './account-service';
import { HttpClient } from '@angular/common/http';
import { StandingOrderRestStep } from './standing-order-rest-step';
import { StandingOrderCacheStep } from './standing-order-cache-step';
import { StandingOrderServiceStep } from './standing-order-service-step';

@Injectable()
export class StandingOrderService {

    private standingOrderServiceStep: StandingOrderServiceStep;

    constructor(
            private httpClient: HttpClient,
            private accountService: AccountService,
            private rotationEntryRestApiService: StandingOrderApiService,
            private appService: ApplicationService) {
        LogUtil.logInits(this, 'init standing-order-service');
        
        const standingOrderRestStep = new StandingOrderRestStep(appService.getBaseUrl(),httpClient);
        this.standingOrderServiceStep = new StandingOrderCacheStep(standingOrderRestStep);
    }

    public addRotationEntry(aAccountItem: AccountItem, aRotationEntry: StandingOrder): Observable<any> {
        if (!this.isReadyToUse(aAccountItem)) {
            return Observable.create(result => { result.error('No restservice available!'); });
        }
        return this.standingOrderServiceStep.addStandingOrder(this.appService.getCurrentUser(), aAccountItem, aRotationEntry);
    }

    public addStandingOrders(aAccountItem: AccountItem, aStandingOrders: StandingOrder[]): Observable<any> {
        if (!this.isReadyToUse(aAccountItem)) {
            return Observable.create(result => { result.error('No restservice available!'); });
        }
        return this.standingOrderServiceStep.addStandingOrders(this.appService.getCurrentUser(), aAccountItem, aStandingOrders);
    }

    public getRotationEntries(aAccountItem: AccountItem): Observable<Array<StandingOrder>> {
        if (!this.isReadyToUse(aAccountItem)) {
            return Observable.create(result => { result.error('No restservice available!'); });
        }
        return this.standingOrderServiceStep.getStandingOrder(this.appService.getCurrentUser(), aAccountItem);
    }

    public deleteRotationEntry(aAccountItem: AccountItem, aRotationEntry: StandingOrder): Observable<any> {
        if (!this.isReadyToUse(aAccountItem)) {
            return Observable.create(result => { result.error('No restservice available!'); });
        }
        return this.standingOrderServiceStep.deleteStandingOrder(this.appService.getCurrentUser(), aAccountItem , aRotationEntry);
    }

    public updateRotationEntry(aAccountItem: AccountItem, aRotationEntry: StandingOrder): Observable<any> {
        if (!this.isReadyToUse(aAccountItem)) {
            return Observable.create(result => { result.error('No restservice available!'); });
        }
        return this.standingOrderServiceStep.updateStandingOrder(this.appService.getCurrentUser(), aAccountItem, aRotationEntry);
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

