import { Injectable } from "@angular/core";
import { ApplicationService } from "../application/application.service";
import { HttpClient } from "@angular/common/http";
import { LogUtil } from "../utils/log-util";
import { User } from "../models/user";
import { Tag } from "../models/tag";
import { Observable } from "rxjs";

@Injectable()
export class TagRestApiService {

    private base_url: string;

    constructor(
        private applicationService: ApplicationService,
        private http: HttpClient){

        LogUtil.info(this, "Init EntryRestApiService");
        this.base_url = applicationService.getApplicationConfig().getBaseUrl();
    }

    public getTags(aUser:User): Observable<Array<Tag>> {
        return this.http.get<Array<Tag>>(this.base_url + "tags/owner/"+aUser.email+"/all");
    }
}