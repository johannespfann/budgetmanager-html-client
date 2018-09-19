import { Injectable } from '@angular/core';
import { Entry } from '../models/entry';
import { LogUtil } from '../utils/log-util';
import { Observable } from 'rxjs';
import { EntryAPIService } from '../rest/entry-api.service';
import { ApplicationService } from '../application/application.service';


@Injectable()
export class EntryService {

    constructor(
        private entryApiService: EntryAPIService,
        private appService: ApplicationService) {
        LogUtil.debug(this, 'Init EntryService');
    }

    public getEntries(): Observable<Entry[]> {
        if (!this.appService.isReadyForRestServices()) {
            return Observable.create(result => { result.error('No restservice available!'); });
        }
        return this.entryApiService.getEntries(this.appService.getCurrentUser());
    }

    public addEntry(aEntry: Entry): Observable<any> {
        if (!this.appService.isReadyForRestServices()) {
            return Observable.create(result => { result.error('No restservice available!'); });
        }
        return this.entryApiService.save(this.appService.getCurrentUser(), aEntry);
    }

    public deleteEntry(aEntry: Entry): Observable<any> {
        if (!this.appService.isReadyForRestServices()) {
            return Observable.create(result => { result.error('No restservice available!'); });
        }
        return this.entryApiService.delete(this.appService.getCurrentUser(), aEntry);
    }

    public update(aEntry: Entry): Observable<any> {
        if (!this.appService.isReadyForRestServices()) {
            return Observable.create(result => { result.error('No restservice available!'); });
        }
        return this.entryApiService.update(this.appService.getCurrentUser(), aEntry);
    }
}
