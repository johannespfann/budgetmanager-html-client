import { Injectable } from "@angular/core";
import { ApplicationService } from "../application/application.service";
import { HttpClient } from "@angular/common/http";
import { LogUtil } from "../utils/log-util";
import { User } from "../models/user";
import { Entry } from "../models/entry";
import { Observable } from "rxjs/Observable";


@Injectable()
export class EntryRestApiService {

    private base_url: string;

    constructor(
        private applicationService: ApplicationService,
        private http: HttpClient){

        LogUtil.info(this, "Init EntryRestApiService");
        this.base_url = applicationService.getApplicationConfig().getBaseUrl();
    }

    public getEntries(aUser:User): Observable<Array<Entry>> {
        return this.http.get<Array<Entry>>(this.base_url + "entries/all/" + aUser.email);
    }

    public addEntry(aUser:User, aEntry:Entry): Observable<any> {
        return this.http.post(this.base_url + "entries/add/" + aUser.email,aEntry);
    }

}