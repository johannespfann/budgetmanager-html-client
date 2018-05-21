import { Component, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { Entry } from "../models/entry";
import { EntryService } from "../services/entry.service";
import { LogUtil } from "../utils/log-util";
import { Tag } from "../models/tag";
import { TagService } from "../services/tag.service";
import { MessagingService } from "../messages/message.service";
import { EntryUpdatedMessage } from "../messages/entry-updated-message";
import { TagsComponent } from '../tags';
import { MathUtil } from "../utils/math-util";

@Component({
    selector: 'edit-entry-component',
    templateUrl: './edit-entry.component.html',
    styleUrls: ['./edit-entry.component.css']
})
export class EditEntryComponent {

    @Input() 
    public entry: Entry;

    //@ViewChild('tagsComponent1')
    @ViewChild(TagsComponent)
    public tagsComponent: TagsComponent;

    public categoriesStrings: Array<string>;

    public possibleTags: Tag[];

    public currentTag: string; 
    
    public amount: number;
    public memo: string;

    public tags: Tag[];
    public hash: string;

    public editEntry: Entry;

    public algebraicSignIsMinus: boolean = true;

    constructor(
        private tagService: TagService,
        private entryService: EntryService,
        private messageService: MessagingService) {
    
            LogUtil.debug(this,'Init EditEntryComponent');

        tagService.getTags().subscribe( (tags: Array<Tag>) => {
            this.possibleTags = tags 
        });
    }

    private ngOnInit(){
        this.editEntry = Entry.copy(this.entry);
        this.amount = this.initAmount(this.editEntry.amount);
        this.memo = this.editEntry.memo;
        this.tags = this.editEntry.tags;
        this.hash = this.editEntry.hash;
    }


    public update(){
        LogUtil.info(this,'Pressed updateCategory');

        let amountValue: number;
        if (this.algebraicSignIsMinus) {
            this.editEntry.amount = MathUtil.convertToNegativ(this.amount);
        }
        else {
            this.editEntry.amount = MathUtil.convertToPositiv(this.amount);
        }

        this.editEntry.memo = this.memo;
        this.editEntry.tags = this.tags;

        this.entryService.update(this.editEntry).subscribe(data => {
            this.clearAttributes();
            this.messageService.publish(new EntryUpdatedMessage(this.editEntry))
        });
    }

    private initAmount(aAmount: number): number {
        if(aAmount >= 0){
            this.algebraicSignIsMinus = false;
            return aAmount;
        }
        else{
            this.algebraicSignIsMinus = true;
            return aAmount * (-1);
        }
    }

    public onTagAdded(aEvent:Tag){
        console.log("onTagAdded", aEvent, this.tags);
    }

    public onTagDeleted(aEvent:Tag){
        console.log("onTagDeleted", aEvent, this.tags);
    }

    public changeAlgebraicSignIsMinus(): void {
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