import { Tag } from "../models/tag";

export class RotationUtil{

    private static seperator: string = ':';

    static convertToString(aTags: Tag[]): string {
        let result: string = '';

        aTags.forEach( (data : Tag) => {
            if(result.length == 0){
                result = result + data.name + '';
            }else{
                result = result + this.seperator + data.name;
            }   
        })
        
        return result;
        
    }

    static convertToTagArray(aTags: string): Tag[] {
        let tags: Tag[] = new Array<Tag>();

        let tagNames: string[] = new Array<string>();

        tagNames = aTags.split(this.seperator);
        
        tagNames.forEach( data => {
            let tag = new Tag();
            tag.name = data;
            tags.push(tag);
        })

        return tags;
    }
    
}