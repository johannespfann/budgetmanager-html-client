
import { Injectable } from "@angular/core";
import { LogUtil } from "../utils/log-util";
import { Tag } from "../models/tag";
import { TagRestApiService } from "./tag-rest-api.service";
import { ApplicationService } from "../application/application.service";
import { Observable } from "rxjs";


@Injectable()
export class TagService{

    private tags: Array<Tag>;

    constructor(
        private applicationService: ApplicationService,
        private tagApiService: TagRestApiService
    ){
        LogUtil.info(this, 'Init TagService');
        this.tags = new Array<Tag>();
    }

    public getTags(): Observable<Array<Tag>> {
        return this.tagApiService.getTags(this.applicationService.getCurrentUser());
    }
    
}