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

    public addRotationEntry(aUser: User, aRotationEntry: RotationEntry): Observable<any> {
        return this.http.post(this.base_url + 'jobs/owner/' + aUser.email + '/add', aRotationEntry);
    }

    public getRotationEntries(aUser: User): Observable<Array<RotationEntry>> {
        return this.http.get<Array<RotationEntry>>(this.base_url + 'jobs/owner/' + aUser.email + '/all');
    }

    public deleteRotationEntry(aUser: User, aRotationEntry: RotationEntry): Observable<any> {
        return this.http.delete(this.base_url + 'jobs/owner/' + aUser.email + '/delete/' + aRotationEntry.hash);
    }

    public updateRotationEntry(aUser: User, aRotationEntry: RotationEntry): Observable<any> {
        return this.http.patch(this.base_url + 'jobs/owner/' + aUser.email + '/update', aRotationEntry);
    }
}