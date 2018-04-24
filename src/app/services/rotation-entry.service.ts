import { LogUtil } from "../utils/log-util";
import { Injectable } from "@angular/core";
import { RotationEntryRestApiService } from "./rotation-entry-rest-api.service";
import { RotationEntry } from "../models/rotationentry";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../application/application.service";
import { RotationEntryEncrypter } from "../utils/rotation-entry-encrypter";

@Injectable()
export class RotationEntryService {

    private rotationEntryEncryptor: RotationEntryEncrypter;

    constructor(
        private rotationEntryRestApiService: RotationEntryRestApiService,
        private appService: ApplicationService) {

        LogUtil.info(this, "Init RotationEntryService");
        this.rotationEntryEncryptor = new RotationEntryEncrypter("keymaster");
    }

    public addRotationEntry(aRotationEntry: RotationEntry): Observable<any> {
        return this.rotationEntryRestApiService.addRotationEntry(
            this.appService.getCurrentUser(), 
            this.rotationEntryEncryptor.encryptEntry(aRotationEntry));
    }

    public getRotationEntries(): Observable<Array<RotationEntry>> {
        return this.rotationEntryRestApiService.getRotationEntries(this.appService.getCurrentUser())
            .map( (entries: RotationEntry[]) => {
                return entries.map( (entry: RotationEntry) => this.rotationEntryEncryptor.decryptEntry(entry))
            });
    }

    public deleteRotationEntry(aRotationEntry: RotationEntry): Observable<any> {
        return this.rotationEntryRestApiService.deleteRotationEntry(this.appService.getCurrentUser(), this.rotationEntryEncryptor.encryptEntry(aRotationEntry));
    }

    public updateRotationEntry(aRotationEntry: RotationEntry): Observable<any> {
        return this.rotationEntryRestApiService.updateRotationEntry(this.appService.getCurrentUser(), this.rotationEntryEncryptor.encryptEntry(aRotationEntry));
    }
}