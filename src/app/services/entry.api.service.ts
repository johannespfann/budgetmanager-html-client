import { Injectable } from "@angular/core";
import { LogUtil } from "../utils/log-util";
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';
import { Entry } from "../models/entry";
import { AppConfiguration } from "../application/application-configuration";
import { ApplicationService } from "../application/application.service";
import { User } from "../models/user";
import { tap } from "rxjs/operators";



@Injectable()
export class EntryAPIService{

    private baseURL: string;

    constructor(
        private http: HttpClient,
        private appService: ApplicationService){
            
            LogUtil.info(this,"Init EntryAPIService");

            this.baseURL = appService.getApplicationConfig().getBaseUrl();
    }

    public delete(aUser:User, aEntry: Entry): Observable<any> {
        return this.http.delete(this.baseURL + 'entries/owner/'+aUser.email+'/delete/'+aEntry.hash);
    }

    public save(aUser: User, aEntry: Entry): Observable<any> {
        return this.http.post(this.baseURL + 'entries/owner/'+aUser.email+'/add', aEntry);
    }

    public getEntries(aUser:User): Observable<Array<Entry>> {
        return this.http.get<Array<Entry>>(this.baseURL + 'entries/owner/'+aUser.email+'/all').pipe(
            tap((entries: Array<Entry>) => {
                entries.forEach(entry => JSON.stringify(entry))
            } )
        );
    }
}