export class Tag {

    public name: string;

    constructor() {
        // default
    }

    public copy(aTag: Tag): Tag {
        const tag: Tag = new Tag();
        tag.name = aTag.name;
        return tag;
    }
}
