import { LogUtil } from "../utils/log-util";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApplicationService } from "../application/application.service";
import { Observable } from "rxjs/Observable";
import { RotationEntry } from "../models/rotationentry";
import { User } from "../models/user";

@Injectable()
export class RotationEntryRestApiService {

    private base_url: string;

    constructor(
        private applicationService: ApplicationService,
        private http: HttpClient) {

        LogUtil.info(this, "Init RotationEntryRestApiService");
        this.base_url = applicationService.getApplicationConfig().getBaseUrl();
    }

    public addRotationEntry(aRotationEntry: RotationEntry, aUser: User): Observable<any> {
        return this.http.post(this.base_url + 'jobs/owner/'+aUser.email+'/add', aRotationEntry);
    }


}