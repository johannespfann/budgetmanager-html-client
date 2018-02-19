import { Injectable } from "@angular/core";
import { Entry } from "../models/entry";
import { CategoryService } from "./category.service";
import { LogUtil } from "../utils/log-util";
import { Category } from "../models/category";
import { Subscription } from "rxjs";
import { MessagingService } from "./message.service";
import { CategoryUpdatedMessage } from "./category-updated-message";
import { CategoryDeletedMessage } from "./category-deleted-message";
import { EntriesModifiedMessage } from "./entries-modified-message";
import { Observable } from "rxjs/Observable";
import { EntryAPIService } from "./entry.api.service";
import { ApplicationService } from "../application/application.service";


@Injectable()
export class EntryService{

    constructor(
            private entryApiService: EntryAPIService,
            private appService: ApplicationService){
        LogUtil.debug(this,"Init EntryService");
    }

    public getEntries(): Observable<Array<Entry>>{
        return this.entryApiService.getEntries(this.appService.getCurrentUser());
    }

    public addEntry(aEntry:Entry): Observable<any>{
        return this.entryApiService.save(this.appService.getCurrentUser(),aEntry);
    }

    public deleteEntry(aEntry:Entry): Observable<any> {
        return this.entryApiService.delete(this.appService.getCurrentUser(),aEntry)
    }

}