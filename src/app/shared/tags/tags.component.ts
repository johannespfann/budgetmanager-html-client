import { Input, Component, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Tag } from '../../models/tag';
import { TagRuleService } from '../../services/tag-rule.service';
import { TagRule } from '../../models/tag-rule';
import { LogUtil } from '../../utils/log-util';


@Component({
    selector: 'app-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnChanges {
    ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
        console.log("changed");
        console.log("SuggestedTag -> " + JSON.stringify(this.suggestedTags))

    }



    @Input()
    public tags: Tag[] = [];

    @Input()
    public suggestedTags: Tag[] = [];

    @Output()
    public tagAdded = new EventEmitter<Tag>();

    @Output()
    public tagDeleted = new EventEmitter<Tag>();

    @Output()
    public suggestedTagSelected = new EventEmitter<Tag>();


    public currentTag = '';


    public constructor() {

    }

    public saveTag(event: any): void {

        LogUtil.info(this, 'saveTag')
        if (this.currentTag.includes(' ')) {

            const temp: Array<string> = this.currentTag.split(' ');
            let preparedTagName: string = temp[0];

            preparedTagName = preparedTagName.replace(' ', '');
            if (preparedTagName === '') {
                this.currentTag = '';
                return;
            }

            const tag: Tag = new Tag();
            tag.name = preparedTagName.toLocaleLowerCase();
            this.tags.push(tag);
            this.currentTag = '';
            this.tagAdded.emit(tag);
        }
    }


    public deleteTag(aTag: Tag): void {
        const index = this.tags.indexOf(aTag);

        if (index !== -1) {
            this.tags.splice(index, 1);
            this.tagDeleted.emit(aTag);
        }
    }

    public selectedSuggestedTag(aTag: Tag): void {
        LogUtil.debug(this, 'selectedSuggestedTag -> ' + JSON.stringify(aTag));
        this.suggestedTagSelected.emit(aTag);
    }

}
