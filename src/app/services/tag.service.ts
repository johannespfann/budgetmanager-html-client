
import { Injectable } from "@angular/core";
import { LogUtil } from "../utils/log-util";
import { Tag } from "../models/tag";


@Injectable()
export class TagService{

    private tags: Array<Tag>;

    constructor(){
        LogUtil.info(this, 'Init TagService');
        // TODO getAllTags from server
        this.tags = new Array<Tag>();
    }

    public addTag(aTag: Tag): void{
        if(!this.isAlreadyPersisted(this.tags,aTag)){
            this.tags.push(aTag);
        }  
    }

    private isAlreadyPersisted(aTags: Array<Tag>, aTag: Tag): boolean {
        return aTags.some(tag => tag.name == aTag.name );
    }

    public getTags(): Array<Tag> {
        return this.tags;
    }
    
}