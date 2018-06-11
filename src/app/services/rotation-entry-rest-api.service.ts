import { LogUtil } from "../utils/log-util";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApplicationService } from "../application/application.service";
import { RotationEntry } from "../models/rotationentry";
import { User } from "../models/user";
import { RotationEntryTransformer } from '../utils/rotation-entry-transformer';
import { RotationEntryServer } from '../models/rotationentry-server';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RotationEntryRestApiService {

    constructor(
        private applicationService: ApplicationService,
        private http: HttpClient) {

        LogUtil.info(this, 'Init RotationEntryRestApiService');
    }

    public addRotationEntry(aUser: User, aRotationEntry: RotationEntry): Observable<any> {

        if (!this.applicationService.isReadyForRestServices()) {
            return Observable.create(result => { result.error('No restservice available!'); });
        }

        const baseUrl = this.applicationService.getBaseUrl();
        const encryptionKey = this.applicationService.getEncryptionKey();

        let rotEntryTransformer = new RotationEntryTransformer()
        return this.http.post(baseUrl + 'jobs/owner/' + aUser.email + '/add',
            rotEntryTransformer.transformRotationEntry(this.applicationService.getEncryptionKey(), aRotationEntry));
    }

    public getRotationEntries(aUser: User): Observable<Array<RotationEntry>> {

        if (!this.applicationService.isReadyForRestServices()) {
            return Observable.create(result => { result.error('No restservice available!'); });
        }

        const baseUrl = this.applicationService.getBaseUrl();
        const encryptionKey = this.applicationService.getEncryptionKey();

        const rotationEntryTranformer = new RotationEntryTransformer();
        return this.http.get<Array<RotationEntryServer>>(baseUrl + 'jobs/owner/' + aUser.email + '/all')
            .pipe(
                map((entries: RotationEntryServer[]) => {
                    const newEntries: RotationEntry[] = new Array<RotationEntry>();

                    entries.forEach((rotServerEntry: RotationEntryServer) => {
                        newEntries.push(rotationEntryTranformer.transformRotationEntryServer(encryptionKey, rotServerEntry));
                    });

                    return newEntries;
                })
            );
    }

    public deleteRotationEntry(aUser: User, aRotationEntry: RotationEntry): Observable<any> {

        if (!this.applicationService.isReadyForRestServices()) {
            return Observable.create(result => { result.error('No restservice available!'); });
        }

        const baseUrl = this.applicationService.getBaseUrl();
        const encryptionKey = this.applicationService.getEncryptionKey();

        let rotationEntryTranformer = new RotationEntryTransformer();
        return this.http.delete(baseUrl + 'jobs/owner/' + aUser.email + '/delete/' + rotationEntryTranformer.transformRotationEntry(encryptionKey, aRotationEntry).hash);
    }

    public updateRotationEntry(aUser: User, aRotationEntry: RotationEntry): Observable<any> {

        if (!this.applicationService.isReadyForRestServices()) {
            return Observable.create(result => { result.error('No restservice available!'); });
        }

        const baseUrl = this.applicationService.getBaseUrl();
        const encryptionKey = this.applicationService.getEncryptionKey();

        let rotationEntryTranformer = new RotationEntryTransformer()
        return this.http.patch(baseUrl + 'jobs/owner/' + aUser.email + '/update', rotationEntryTranformer.transformRotationEntry(encryptionKey, aRotationEntry));
    }

}