

export class Tag{

    public name: string;
    
    constructor(){
        // default
    }

    public copy(aTag: Tag): Tag {
        let tag: Tag = new Tag();
        tag.name = aTag.name;
        return tag;
    }

}