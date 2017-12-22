
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
        
        let found = this.tags.find(tag => {
            if(tag.name == aTag.name){
                return true;
            }
        });

        LogUtil.info(this,'found is: ' + found);

        if(found == null){
            this.tags.push(aTag);
        }  
    }

    public getTags(): Array<Tag> {
        return null;
    }
    
}