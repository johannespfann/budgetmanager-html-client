import { LogUtil } from '../utils/log-util';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApplicationService } from '../application/application.service';
import { RotationEntry } from '../models/rotationentry';
import { User } from '../models/user';
import { RotationEntryTransformer } from '../utils/rotation-entry-transformer';
import { RotationEntryServer } from '../models/rotationentry-server';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RotationEntryRestApiService {

    constructor(
        private applicationService: ApplicationService,
        private http: HttpClient) {

        LogUtil.logInits(this, 'Init RotationEntryRestApiService');
    }

    public addRotationEntry(aUser: User, aRotationEntry: RotationEntry): Observable<any> {

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);

        const baseUrl = this.applicationService.getBaseUrl();
        const encryptionKey = this.applicationService.getEncryptionKey();

        const rotEntryTransformer = new RotationEntryTransformer();
        return this.http.post(baseUrl + 'jobs/owner/' + aUser.name + '/add',
            rotEntryTransformer.transformRotationEntry(this.applicationService.getEncryptionKey(), aRotationEntry), { headers : headers});
    }

    public getRotationEntries(aUser: User): Observable<Array<RotationEntry>> {

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);

        const baseUrl = this.applicationService.getBaseUrl();
        const encryptionKey = this.applicationService.getEncryptionKey();

        const rotationEntryTranformer = new RotationEntryTransformer();
        return this.http.get<Array<RotationEntryServer>>(baseUrl + 'jobs/owner/' + aUser.name + '/all', { headers : headers})
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

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);

        const baseUrl = this.applicationService.getBaseUrl();
        const encryptionKey = this.applicationService.getEncryptionKey();

        const rotationEntryTranformer = new RotationEntryTransformer();
        return this.http.delete(baseUrl
            + 'jobs/owner/'
            + aUser.name
            + '/delete/'
            + rotationEntryTranformer.transformRotationEntry(encryptionKey, aRotationEntry).hash, { headers : headers});
    }

    public updateRotationEntry(aUser: User, aRotationEntry: RotationEntry): Observable<any> {

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);

        const baseUrl = this.applicationService.getBaseUrl();
        const encryptionKey = this.applicationService.getEncryptionKey();

        const rotationEntryTranformer = new RotationEntryTransformer();
        return this.http.patch(baseUrl
            + 'jobs/owner/'
            + aUser.name
            + '/update',
        rotationEntryTranformer.transformRotationEntry(encryptionKey, aRotationEntry), { headers : headers});
    }

}
