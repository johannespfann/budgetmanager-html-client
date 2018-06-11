import { Tag } from "../models/tag";
import { Input, Component, Output, EventEmitter } from "@angular/core";


@Component({
    selector: "tags",
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.css']
})
export class TagsComponent {

    @Input()
    public tags: Tag[] = [];

    @Input()
    public possibleTags: Tag[] = [];

    @Output()
    public tagAdded = new EventEmitter<Tag>();

    @Output()
    public tagDeleted = new EventEmitter<Tag>();

    public currentTag = '';

    public constructor() {

    }

    public saveTag(event: any): void {

        if (this.currentTag.includes(' ')) {

            const temp: Array<string> = this.currentTag.split(' ');
            let preparedTagName: string = temp[0];

            preparedTagName = preparedTagName.replace(' ', '');
            if (preparedTagName === '') {
                this.currentTag = '';
                return;
            }

            const tag: Tag = new Tag();
            tag.name = preparedTagName;
            this.tags.push(tag);
            this.currentTag = '';
            this.tagAdded.emit(tag);
        }
    }

    private deleteTag(aTag: Tag): void {
        //this.tags = this.tags.filter(tag => aTag != tag);
        const index = this.tags.indexOf(aTag);

        if (index !== -1) {
            this.tags.splice(index, 1);
            this.tagDeleted.emit(aTag);
        }

    }

}