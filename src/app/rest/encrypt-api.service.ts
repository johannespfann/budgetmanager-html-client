import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable()
export class EncryptApiSerice {

    private base: string;

    constructor(private http: HttpClient) {}

    public isEncrypted(aBaseUrl: string, aUser: User): Observable<boolean> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);

        return this.http.get<boolean>(aBaseUrl + 'encryption/owner/' + aUser.name + '/isencrypted', { headers: headers });
    }

    public getEncryptionText(aBaseUrl: string, aUser: User): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);

        return this.http.get<any>(aBaseUrl + 'encryption/owner/' + aUser.name + '/getencrypttext', { headers: headers });
    }

    public setEncryptionText(aBaseUrl: string, aUser: User, aText: string): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', aUser.name + ':' + aUser.accesstoken);

        return this.http.post(aBaseUrl + 'encryption/owner/' + aUser.name + '/setencrypttext', aText, { headers: headers });
    }
}
