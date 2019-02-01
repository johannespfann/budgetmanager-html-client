import { Injectable } from '@angular/core';
import { TagStatisticRestApiService } from '../rest/tag-statistic-api.service';
import { ApplicationService } from '../application/application.service';
import { LogUtil } from '../utils/log-util';
import { TagStatistic } from '../models/tagstatistic';
import { Observable } from 'rxjs';

@Injectable()
export class TagStatisticService {

    constructor(
        private tagStatisticRestApiService: TagStatisticRestApiService,
        private appService: ApplicationService) {
            LogUtil.info(this, 'Init EntryService');
    }

    public getTagStatistic(): Observable<TagStatistic[]> {
        if (!this.appService.isReadyForRestServices()) {
            return Observable.create( result  => { result.error('No restservice available! getTagStatistics'); });
        }

        return this.tagStatisticRestApiService.getTagStatistics(this.appService.getCurrentUser());
    }

    public persistTagStatistic(aTagStatistics: TagStatistic[]): Observable<any> {
        if (!this.appService.isReadyForRestServices()) {
            return Observable.create( result  => { result.error('No restservice available! persistTagStatistics'); });
        }

        return this.tagStatisticRestApiService.persistTagStatistics(this.appService.getCurrentUser(), aTagStatistics);
    }
}
