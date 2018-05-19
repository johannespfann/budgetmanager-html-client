import { Injectable } from "@angular/core";
import { LogUtil } from "../utils/log-util";
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';
import { Entry } from "../models/entry";
import { AppConfiguration } from "../application/application-configuration";
import { ApplicationService } from "../application/application.service";
import { User } from "../models/user";
import { tap } from "rxjs/operators";
import { CryptUtil } from "../utils/crypt-util";
import { EntryTransformer } from "../utils/entry-transformer";
import { EntryServer } from "../models/entry-server";



@Injectable()
export class EntryAPIService {

    private baseURL: string;

    private entryTransformer: EntryTransformer;

    constructor(
        private http: HttpClient,
        private appService: ApplicationService) {
        LogUtil.info(this, "Init EntryAPIService");
        this.baseURL = appService.getApplicationConfig().getBaseUrl();
        this.entryTransformer = new EntryTransformer(appService.getEncryptionKey());
    }

    public delete(aUser: User, aEntry: Entry): Observable<any> {
        return this.http.delete(this.baseURL + 'entries/owner/' + aUser.email + '/delete/' + aEntry.hash);
    }

    public save(aUser: User, aEntry: Entry): Observable<any> {
        return this.http.post(this.baseURL + 'entries/owner/' + aUser.email + '/add', this.entryTransformer.transformEntry(aEntry));
    }

    public getEntries(aUser: User): Observable<Array<Entry>> {
        return this.http.get<Array<EntryServer>>(this.baseURL + 'entries/owner/' + aUser.email + '/all')
            .map((serverEntries: Array<EntryServer>) => {
                let entries = new Array<Entry>();
                
                serverEntries.forEach((entry:EntryServer) => {
                    entries.push(this.entryTransformer.transformEntryServer(entry))
                })
                return entries;
            })
    }

    public update(aUser: User, aEntry: Entry): Observable<any> {
        console.log("send tags");
        aEntry.tags.forEach(tag => console.log(JSON.stringify(tag)))
        return this.http.patch(this.baseURL + 'entries/owner/' + aUser.email + '/update', this.entryTransformer.transformEntry(aEntry));
    }
}