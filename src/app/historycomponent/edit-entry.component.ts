import { Component, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { Entry } from "../models/entry";
import { EntryService } from "../services/entry.service";
import { LogUtil } from "../utils/log-util";
import { Tag } from "../models/tag";
import { TagService } from "../services/tag.service";
import { MessagingService } from "../messages/message.service";
import { EntryUpdatedMessage } from "../messages/entry-updated-message";
import { TagsComponent } from '../tags';

@Component({
    selector: 'edit-entry-component',
    templateUrl: './edit-entry.component.html',
    styleUrls: ['./edit-entry.component.css']
})
export class EditEntryComponent {

    @Input() entry: Entry;

    //@ViewChild('tagsComponent1')
    @ViewChild(TagsComponent)
    public tagsComponent: TagsComponent;

    private categoriesStrings: Array<string>;

    private possibleTags: Tag[];

    private currentTag: string; 
    
    private amount: number;
    private memo: string;

    private tags: Tag[];
    private hash: string;

    private editEntry: Entry;

    private algebraicSignIsMinus: boolean = true;

    constructor(
        private tagService: TagService,
        private entryService: EntryService,
        private messageService: MessagingService) {
            LogUtil.debug(this,'Init EditEntryComponent');

        tagService.getTags().subscribe( (tags: Array<Tag>) => {
            this.possibleTags = tags 
        });
    }

    private update(){
        LogUtil.info(this,'Pressed updateCategory');

        this.editEntry.amount = this.amount;
        this.editEntry.memo = this.memo;
        this.editEntry.tags = this.tags;

        this.entryService.update(this.editEntry).subscribe(data => {
            this.clearAttributes();
            this.messageService.publish(new EntryUpdatedMessage(this.editEntry))
        });

    }

    public onTagAdded(aEvent:Tag){
        console.log("onTagAdded", aEvent, this.tags);
    }

    public onTagDeleted(aEvent:Tag){
        console.log("onTagDeleted", aEvent, this.tags);
    }

    private ngOnInit(){
        this.editEntry = Entry.copy(this.entry);
        this.amount = this.editEntry.amount;
        this.memo = this.editEntry.memo;
        this.tags = this.editEntry.tags;
        this.hash = this.editEntry.hash;
    }

    private changeAlgebraicSignIsMinus(): void {
        if(this.algebraicSignIsMinus){
            this.algebraicSignIsMinus = false;
        }
        else{
            this.algebraicSignIsMinus = true;
        }
    }

    private clearAttributes():void {
        this.tags.splice(0, this.tags.length);
        this.amount = 0;
        this.algebraicSignIsMinus = true;
        this.memo = "";
    }
}