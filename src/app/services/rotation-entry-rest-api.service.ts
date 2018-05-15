import { LogUtil } from "../utils/log-util";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApplicationService } from "../application/application.service";
import { Observable } from "rxjs/Observable";
import { RotationEntry } from "../models/rotationentry";
import { User } from "../models/user";
import { RotationEntryTransformer } from "../utils/rotation-entry-transformer";
import { RotationEntryServer } from "../models/rotationentry-server";

@Injectable()
export class RotationEntryRestApiService {

    private base_url: string;

    private rotationEntryTranformer: RotationEntryTransformer;

    constructor(
        private applicationService: ApplicationService,
        private http: HttpClient) {

        LogUtil.info(this, "Init RotationEntryRestApiService");
        this.base_url = applicationService.getApplicationConfig().getBaseUrl();
        let password: string = applicationService.getApplicationConfig().getCryptPassword();
        this.rotationEntryTranformer = new RotationEntryTransformer(password);
    }

    public addRotationEntry(aUser: User, aRotationEntry: RotationEntry): Observable<any> {
        return this.http.post(this.base_url + 'jobs/owner/' + aUser.email + '/add', 
                            this.rotationEntryTranformer.transformRotationEntry(aRotationEntry));
    }

    public getRotationEntries(aUser: User): Observable<Array<RotationEntry>> {
        return this.http.get<Array<RotationEntryServer>>(this.base_url + 'jobs/owner/' + aUser.email + '/all')
                        .map( (entries: RotationEntryServer[]) => { 
                            let newEntries: RotationEntry[] = new Array<RotationEntry>();
                            
                            entries.forEach( (rotServerEntry: RotationEntryServer) => {
                                newEntries.push(this.rotationEntryTranformer.transformRotationEntryServer(rotServerEntry));
                            })

                            return newEntries;
                         });
    }

    public deleteRotationEntry(aUser: User, aRotationEntry: RotationEntry): Observable<any> {
        return this.http.delete(this.base_url + 'jobs/owner/' + aUser.email + '/delete/' + this.rotationEntryTranformer.transformRotationEntry(aRotationEntry).hash);
    }

    public updateRotationEntry(aUser: User, aRotationEntry: RotationEntry): Observable<any> {
        return this.http.patch(this.base_url + 'jobs/owner/' + aUser.email + '/update', this.rotationEntryTranformer.transformRotationEntry(aRotationEntry));
    }
    
}