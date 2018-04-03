import { LogUtil } from "../utils/log-util";
import { Injectable } from "@angular/core";
import { RotationEntryRestApiService } from "./rotation-entry-rest-api.service";
import { RotationEntry } from "../models/rotationentry";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../application/application.service";

@Injectable()
export class RotationEntryService{

    constructor(
        private rotationEntryRestApiService: RotationEntryRestApiService,
        private appService: ApplicationService){

        LogUtil.info(this,"Init RotationEntryService");
    }

    public addRotationEntry(aRotationEntry: RotationEntry): Observable<any> {
        return this.rotationEntryRestApiService.addRotationEntry(aRotationEntry, this.appService.getCurrentUser());
    }

}