import { Component, style } from "@angular/core";

import { Tag } from "../models/tag";
import { Entry } from "../models/entry";
import { MathUtil } from "../utils/math-util";
import { EntryService } from "../services/entry.service";
import { LogUtil } from "../utils/log-util";
import { TagService } from "../services/tag.service";
import { RotationEntry } from "../models/rotationentry";
import { RotationEntryService } from "../services/rotation-entry.service";
import { RotationUtil } from "../rotationentrycomponent/rotationutil";


@Component({
    selector: 'newentry',
    templateUrl: './add-entry.component.html',
    styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent {

    private algebraicSignIsMinus: boolean = true;

    private amount: number;
    
    private memo: string;

    private tags: Tag[];

    private possibleTags: Tag[];

    private currentTag: string;

    private startRotationDate: Date;

    private isPeriodical: boolean = false;

    constructor(
        private tagService: TagService,
        private entryService: EntryService,
        private rotationEntryService: RotationEntryService) {

        LogUtil.info(this, 'Invoke AddEntryComponent');

        this.startRotationDate = new Date();

        LogUtil.info(this, 'Date: ' + this.startRotationDate.toLocaleDateString());

        this.algebraicSignIsMinus = true;
        this.amount;
        this.memo = "";

        tagService.getTags().subscribe((tags: Array<Tag>) => {
            this.possibleTags = tags
        });

        this.tags = new Array<Tag>();
    }

    private save(): void {

        let amountValue: number;

        if (this.algebraicSignIsMinus) {
            amountValue = MathUtil.convertToNegativ(this.amount);
        }
        else {
            amountValue = MathUtil.convertToPositiv(this.amount);
        }

        let entry: Entry = Entry.create(amountValue);

        entry.setMemo(this.memo);

        entry.tags = this.tags;

        if (this.isPeriodical) {
             let rotationEntry: RotationEntry = RotationEntry.create(amountValue,"66122");  
             rotationEntry.last_executed = null;
             rotationEntry.start_at = this.startRotationDate;
             // TODO
             LogUtil.info(this,JSON.stringify(this.tags));
             rotationEntry.tags = this.tags;
             LogUtil.info(this,JSON.stringify(rotationEntry.tags));
             rotationEntry.memo = this.memo;
             rotationEntry.end_at = null;

             this.rotationEntryService.addRotationEntry(rotationEntry).subscribe(
                 data => {
                     LogUtil.info(this, "save : " + JSON.stringify(rotationEntry));
                     this.cleanAttributes();
                 }
             )

        }
        
        if (!this.isPeriodical) {
            LogUtil.info(this, "Add new Entry: size of tags: " + entry.tags.length);
            LogUtil.info(this, JSON.stringify(entry));
            this.entryService.addEntry(entry).subscribe(
                data => {
                    LogUtil.info(this, 'save : ' + JSON.stringify(entry));
                    this.cleanAttributes();
                }
            );
        }
        

    }

    private cleanAttributes(): void {
        this.amount = null;
        this.memo = null;
        this.tags = new Array<Tag>();
        this.isPeriodical = false;
    

    }

    private changeAlgebraicSignIsMinus(): void {
        if (this.algebraicSignIsMinus) {
            this.algebraicSignIsMinus = false;
        }
        else {
            this.algebraicSignIsMinus = true;
        }
    }

    private changePeriodical() {
        if (this.isPeriodical) {
            this.isPeriodical = false;
        }
        else {
            this.isPeriodical = true;
        }
    }

}