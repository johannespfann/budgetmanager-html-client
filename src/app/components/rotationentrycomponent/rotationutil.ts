import { Tag } from '../../models/tag';

export class RotationUtil {

    private static seperator = ':';

    static convertToString(aTags: Tag[]): string {
        let result = '';

        aTags.forEach( (data: Tag) => {
            if (result.length === 0) {
                result = result + data.name + '';
            }else {
                result = result + this.seperator + data.name;
            }
        });

        return result;
    }

    static convertToTagArray(aTags: string): Tag[] {
        const tags = new Array<Tag>();

        let tagNames: string[] = new Array<string>();

        tagNames = aTags.split(this.seperator);
        tagNames.forEach( data => {
            const tag = new Tag();
            tag.name = data;
            tags.push(tag);
        });

        return tags;
    }
}
