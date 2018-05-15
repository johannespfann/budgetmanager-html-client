import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { ApplicationService } from "../application/application.service";
import { Observable } from "rxjs";

@Injectable()
export class EncryptSerice {
    
    private base: string;

    constructor(
        private applicationService: ApplicationService,
        private http: HttpClient){

            this.base = applicationService.getApplicationConfig().getBaseUrl();
    }

    public isEncrypted(aUser: User): Observable<boolean> {
        return this.http.get<boolean>(this.base + 'encryption/owner/' + aUser.name + '/isencrypted');
    }

    public getEncryptionText(aUser: User): Observable<any> {
        return this.http.get<any>(this.base + 'encryption/owner/' + aUser.name + '/getencrypttext');
    }

    public setEncryptionText(aUser: User, aText: string): Observable<any> {
        return this.http.post(this.base + 'encryption/owner/' + aUser.name + '/setencrypttext', aText);
    }

}