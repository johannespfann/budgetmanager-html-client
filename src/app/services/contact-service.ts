import { ApplicationService } from "../application/application.service";
import { LogUtil } from "../utils/log-util";
import { Observable } from "rxjs";
import { ContactApiService } from "../rest/contact-api.service";
import { ContactMessage } from "../models/contact-message";
import { Injectable } from "@angular/core";

@Injectable()
export class ContactService {

    constructor(
        private contactApiService: ContactApiService,
        private appService: ApplicationService) {
        LogUtil.debug(this, 'Init ContactService');
    }

    public send(aConactMessage: ContactMessage): Observable<any> {
        return this.contactApiService.send(this.appService.getBaseUrl(),aConactMessage)
    }

}