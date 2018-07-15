import { Injectable } from '@angular/core';
import { LogUtil } from '../utils/log-util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Entry } from '../models/entry';
import { ApplicationService } from '../application/application.service';
import { User } from '../models/user';
import { tap } from 'rxjs/operators';
import { CryptUtil } from '../utils/crypt-util';
import { EntryTransformer } from '../utils/entry-transformer';
import { EntryServer } from '../models/entry-server';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class EntryAPIService {


    private entryTransformer: EntryTransformer;

    constructor(
        private http: HttpClient,
        private appService: ApplicationService) {

        LogUtil.info(this, 'Init EntryAPIService');
        this.entryTransformer = new EntryTransformer();
    }

    public delete(aUser: User, aEntry: Entry): Observable<any> {

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);

        if (!this.appService.isReadyForRestServices()) {
            return Observable.create(result => { result.error('No restservice available!'); });
        }

        const baseUrl = this.appService.getBaseUrl();


        return this.http.delete(
            baseUrl + 'entries/owner/' + aUser.name + '/delete/' + aEntry.hash, { headers : headers});
    }

    public save(aUser: User, aEntry: Entry): Observable<any> {

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);


        if (!this.appService.isReadyForRestServices()) {
            return Observable.create(result => { result.error('No restservice available!'); });
        }

        const baseUrl = this.appService.getBaseUrl();
        const encryptionKey = this.appService.getEncryptionKey();

        return this.http.post(baseUrl + 'entries/owner/' + aUser.name + '/add',
        this.entryTransformer.transformEntry(encryptionKey, aEntry), { headers : headers});
    }

    public getEntries(aUser: User): Observable<Array<Entry>> {

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);
        LogUtil.info(this, 'Headers for get ' + JSON.stringify(headers));

        if (!this.appService.isReadyForRestServices()) {
            return Observable.create(result => { result.error('No restservice available!'); });
        }

        const baseUrl = this.appService.getBaseUrl();
        const encryptionKey = this.appService.getEncryptionKey();

        return this.http.get<Array<EntryServer>>(baseUrl + 'entries/owner/' + aUser.name + '/all', { headers : headers})
            .pipe(
                map((serverEntries: Array<EntryServer>) => {
                    const entries = new Array<Entry>();

                    serverEntries.forEach((entry: EntryServer) => {
                        entries.push(this.entryTransformer.transformEntryServer(encryptionKey, entry));
                    });

                    return entries;
                })
            );
    }

    public update(aUser: User, aEntry: Entry): Observable<any> {

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);

        if (!this.appService.isReadyForRestServices()) {
            return Observable.create(result => { result.error('No restservice available!'); });
        }

        const baseUrl = this.appService.getBaseUrl();
        const encryptionKey = this.appService.getEncryptionKey();

        return this.http.patch(
            baseUrl
            + 'entries/owner/'
            + aUser.name
            + '/update', this.entryTransformer.transformEntry(encryptionKey, aEntry), { headers : headers});
    }
}
