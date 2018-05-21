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

    constructor(
        private applicationService: ApplicationService,
        private http: HttpClient) {

        LogUtil.info(this, "Init RotationEntryRestApiService");
        this.base_url = applicationService.getApplicationConfig().getBaseUrl();
    }

    public addRotationEntry(aUser: User, aRotationEntry: RotationEntry): Observable<any> {

        if(!this.applicationService.isReadyForRestServices()){
            return Observable.create( result  => { result.error("No restservice available!");});
        }

        let rotEntryTransformer = new RotationEntryTransformer()
        return this.http.post(this.base_url + 'jobs/owner/' + aUser.email + '/add', 
                            rotEntryTransformer.transformRotationEntry(this.applicationService.getEncryptionKey(), aRotationEntry));
    }

    public getRotationEntries(aUser: User): Observable<Array<RotationEntry>> {

        if(!this.applicationService.isReadyForRestServices()){
            return Observable.create( result  => { result.error("No restservice available!");});
        }

        let rotationEntryTranformer = new RotationEntryTransformer()
        return this.http.get<Array<RotationEntryServer>>(this.base_url + 'jobs/owner/' + aUser.email + '/all')
                        .map( (entries: RotationEntryServer[]) => { 
                            let newEntries: RotationEntry[] = new Array<RotationEntry>();
                            
                            entries.forEach( (rotServerEntry: RotationEntryServer) => {
                                newEntries.push(rotationEntryTranformer.transformRotationEntryServer(this.applicationService.getEncryptionKey(), rotServerEntry));
                            });

                            return newEntries;
                         });
    }

    public deleteRotationEntry(aUser: User, aRotationEntry: RotationEntry): Observable<any> {

        if(!this.applicationService.isReadyForRestServices()){
            return Observable.create( result  => { result.error("No restservice available!");});
        }

        let rotationEntryTranformer = new RotationEntryTransformer();
        return this.http.delete(this.base_url + 'jobs/owner/' + aUser.email + '/delete/' + rotationEntryTranformer.transformRotationEntry(this.applicationService.getEncryptionKey(), aRotationEntry).hash);
    }

    public updateRotationEntry(aUser: User, aRotationEntry: RotationEntry): Observable<any> {

        if(!this.applicationService.isReadyForRestServices()){
            return Observable.create( result  => { result.error("No restservice available!");});
        }

        let rotationEntryTranformer = new RotationEntryTransformer()
        return this.http.patch(this.base_url + 'jobs/owner/' + aUser.email + '/update', rotationEntryTranformer.transformRotationEntry(this.applicationService.getEncryptionKey(), aRotationEntry));
    }
    
}