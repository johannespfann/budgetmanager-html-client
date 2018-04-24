import { Injectable } from "@angular/core";
import { Entry } from "../models/entry";
import { LogUtil } from "../utils/log-util";
import { Subscription } from "rxjs";
import { MessagingService } from "../messages/message.service";
import { EntriesModifiedMessage } from "../messages/entries-modified-message";
import { Observable } from "rxjs/Observable";
import { EntryAPIService } from "./entry.api.service";
import { ApplicationService } from "../application/application.service";
import { EntryEncrypter } from "../utils/entry-encrypter";


@Injectable()
export class EntryService {

    private entryEncryptor: EntryEncrypter;

    constructor(
        private entryApiService: EntryAPIService,
        private appService: ApplicationService) {
        LogUtil.debug(this, "Init EntryService");

        this.entryEncryptor = new EntryEncrypter("keymaster");
    }

    public getEntries(): Observable<Entry[]> {
        return this.entryApiService.getEntries(this.appService.getCurrentUser()).map((entries: Entry[]) => {
            var newEntry: Entry[] = entries.map( (entry: Entry) => {
                return this.entryEncryptor.decryptEntry(entry);
            });
            return newEntry;
        });
    }

    public addEntry(aEntry: Entry): Observable<any> {
        return this.entryApiService.save(this.appService.getCurrentUser(), this.entryEncryptor.encryptEntry(aEntry));
    }

    public deleteEntry(aEntry: Entry): Observable<any> {
        return this.entryApiService.delete(this.appService.getCurrentUser(), this.entryEncryptor.encryptEntry(aEntry));
    }

    public update(aEntry: Entry): Observable<any> {
        return this.entryApiService.update(this.appService.getCurrentUser(), this.entryEncryptor.encryptEntry(aEntry));
    }

}