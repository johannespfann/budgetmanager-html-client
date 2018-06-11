import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { ApplicationService } from '../application/application.service';
import { Observable } from 'rxjs';

@Injectable()
export class EncryptSerice {

    private base: string;

    constructor(
        private http: HttpClient) {
    }

    public isEncrypted(aBaseUrl: string, aUser: User): Observable<boolean> {
        return this.http.get<boolean>(aBaseUrl + 'encryption/owner/' + aUser.name + '/isencrypted');
    }

    public getEncryptionText(aBaseUrl: string, aUser: User): Observable<any> {
        return this.http.get<any>(aBaseUrl + 'encryption/owner/' + aUser.name + '/getencrypttext');
    }

    public setEncryptionText(aBaseUrl: string, aUser: User, aText: string): Observable<any> {
        return this.http.post(aBaseUrl + 'encryption/owner/' + aUser.name + '/setencrypttext', aText);
    }
}
