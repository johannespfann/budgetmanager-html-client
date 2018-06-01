import { LogUtil } from "../utils/log-util";
import { Injectable } from "@angular/core";
import { RotationEntryRestApiService } from "./rotation-entry-rest-api.service";
import { RotationEntry } from "../models/rotationentry";
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApplicationService } from "../application/application.service";

@Injectable()
export class RotationEntryService {

    constructor(
        private rotationEntryRestApiService: RotationEntryRestApiService,
        private appService: ApplicationService) {

        LogUtil.info(this, "Init RotationEntryService");
    }

    public addRotationEntry(aRotationEntry: RotationEntry): Observable<any> {
        return this.rotationEntryRestApiService.addRotationEntry(this.appService.getCurrentUser(), aRotationEntry);
    }

    public getRotationEntries(): Observable<Array<RotationEntry>> {
        return this.rotationEntryRestApiService.getRotationEntries(this.appService.getCurrentUser());
    }

    public deleteRotationEntry(aRotationEntry: RotationEntry): Observable<any> {
        return this.rotationEntryRestApiService.deleteRotationEntry(this.appService.getCurrentUser(), aRotationEntry);
    }

    public updateRotationEntry(aRotationEntry: RotationEntry): Observable<any> {
        return this.rotationEntryRestApiService.updateRotationEntry(this.appService.getCurrentUser(), aRotationEntry);
    }
}