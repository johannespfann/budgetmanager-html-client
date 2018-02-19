

export class Tag{

    public id: string;

    public name: string;
    
    constructor(){
        // default
    }

    public copy(aTag: Tag): Tag {
        let tag: Tag = new Tag();
        tag.name = aTag.name;
        tag.id = aTag.id;
        return tag;
    }

}