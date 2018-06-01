import { Injectable } from "@angular/core";
import { Entry } from "../models/entry";
import { LogUtil } from "../utils/log-util";
import { Subscription } from "rxjs";
import { MessagingService } from "../messages/message.service";
import { EntriesModifiedMessage } from "../messages/entries-modified-message";
import { Observable } from "rxjs";
import { EntryAPIService } from "./entry.api.service";
import { ApplicationService } from "../application/application.service";


@Injectable()
export class EntryService {

    constructor(
        private entryApiService: EntryAPIService,
        private appService: ApplicationService) {
        LogUtil.debug(this, "Init EntryService");
    }

    public getEntries(): Observable<Entry[]> {
        return this.entryApiService.getEntries(this.appService.getCurrentUser());
    }

    public addEntry(aEntry: Entry): Observable<any> {
        return this.entryApiService.save(this.appService.getCurrentUser(), aEntry);
    }

    public deleteEntry(aEntry: Entry): Observable<any> {
        return this.entryApiService.delete(this.appService.getCurrentUser(), aEntry);
    }

    public update(aEntry: Entry): Observable<any> {
        return this.entryApiService.update(this.appService.getCurrentUser(), aEntry);
    }

}