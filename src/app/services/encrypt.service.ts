import { Injectable } from '@angular/core';
import { EncryptApiSerice } from '../rest/encrypt-api.service';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable()
export class EnryptService {

    constructor(private encryptApiService: EncryptApiSerice){

    }
    // TODO
    public isEncrypted(aBaseUrl: string, aUser: User): Observable<boolean> {
        return null;
    }

    // TODO
    public getEncryptionText(aBaseUrl: string, aUser: User): Observable<any> {
        return null;
    }

    // TODO
    public setEncryptionText(aBaseUrl: string, aUser: User, aText: string): Observable<any> {
        return null;
    }

}
