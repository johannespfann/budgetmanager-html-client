import { LogUtil } from '../utils/log-util';
import { StandingOrderApiService } from '../rest/standing-order-api.service';
import { ApplicationService } from '../application/application.service';
import { RotationEntry } from '../models/rotationentry';
import { Observable } from 'rxjs';
import { AccountItem } from '../models/account-item';
import { Injectable } from '@angular/core';

@Injectable()
export class StandingOrderService {

    constructor(
        private rotationEntryRestApiService: StandingOrderApiService,
        private appService: ApplicationService) {
            LogUtil.debug(this, 'init standing-order-service');
    }

    public addRotationEntry(aAccountItem: AccountItem, aRotationEntry: RotationEntry): Observable<any> {
        if (!this.appService.isReadyForRestServices()) {
            return Observable.create(result => { result.error('No restservice available!'); });
        }
        return this.rotationEntryRestApiService.addRotationEntry(this.appService.getCurrentUser(), aAccountItem, aRotationEntry);
    }

    public getRotationEntries(aAccountItem: AccountItem): Observable<Array<RotationEntry>> {
        if (!this.appService.isReadyForRestServices()) {
            return Observable.create(result => { result.error('No restservice available!'); });
        }
        return this.rotationEntryRestApiService.getRotationEntries(this.appService.getCurrentUser(), aAccountItem);
    }

    public deleteRotationEntry(aAccountItem: AccountItem, aRotationEntry: RotationEntry): Observable<any> {
        if (!this.appService.isReadyForRestServices()) {
            return Observable.create(result => { result.error('No restservice available!'); });
        }
        return this.rotationEntryRestApiService.deleteRotationEntry(this.appService.getCurrentUser(), aAccountItem , aRotationEntry);
    }

    public updateRotationEntry(aAccountItem: AccountItem, aRotationEntry: RotationEntry): Observable<any> {
        if (!this.appService.isReadyForRestServices()) {
            return Observable.create(result => { result.error('No restservice available!'); });
        }
        return this.rotationEntryRestApiService.updateRotationEntry(this.appService.getCurrentUser(), aAccountItem, aRotationEntry);
    }

}

