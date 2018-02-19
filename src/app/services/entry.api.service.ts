import { Injectable } from "@angular/core";
import { LogUtil } from "../utils/log-util";
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';
import { Entry } from "../models/entry";
import { AppConfiguration } from "../application/application-configuration";
import { ApplicationService } from "../application/application.service";
import { User } from "../models/user";


@Injectable()
export class EntryAPIService{

    private baseURL: string;

    constructor(
        private http: HttpClient,
        private appService: ApplicationService){
            
            LogUtil.info(this,"Init EntryAPIService");

            this.baseURL = appService.getApplicationConfig().getBaseUrl();

    }

    public getEntries(aUser:User): Observable<any> {
        return this.http.get<any>(this.baseURL + aUser.email).map(
            (data: Array<any>) => {
                data.forEach( entry => LogUtil.info(this, JSON.stringify(entry)))
            }
        );
    }

}