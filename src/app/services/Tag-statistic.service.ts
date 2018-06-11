import { Injectable } from '@angular/core';
import { TagStatisticRestApiService } from './tag-statistic-rest-api.service';
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
        return this.tagStatisticRestApiService.getTagStatistics(this.appService.getCurrentUser());
    }

    public persistTagStatistic(aTagStatistics: TagStatistic[]): Observable<any> {
        return this.tagStatisticRestApiService.persistTagStatistics(this.appService.getCurrentUser(), aTagStatistics);
    }
}
