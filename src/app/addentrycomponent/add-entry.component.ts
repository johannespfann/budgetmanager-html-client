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
import { DateUtil } from "../utils/date-util";


@Component({
    selector: 'newentry',
    templateUrl: './add-entry.component.html',
    styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent {

    public algebraicSignIsMinus: boolean = true;

    public amount: number;
    
    public memo: string;

    public tags: Tag[];

    public possibleTags: Tag[];

    public currentTag: string;

    public startRotationDate: Date;

    public isPeriodical: boolean = false;

    public isMonthly: boolean = false;

    public isQuarterly: boolean = false;

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
        this.isMonthly = true;
        this.isQuarterly = false;

        tagService.getTags().subscribe((tags: Array<Tag>) => {
            this.possibleTags = tags
        });

        this.tags = new Array<Tag>();
    }

    public save(): void {

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
             let rotationEntry: RotationEntry = RotationEntry.create(amountValue,this.getRotationStrategy());  
             rotationEntry.last_executed = null;
             rotationEntry.start_at = this.startRotationDate;
             // TODO
             LogUtil.info(this,JSON.stringify(this.tags));
             rotationEntry.tags = this.tags;
             LogUtil.info(this,JSON.stringify(rotationEntry.tags));
             rotationEntry.memo = this.memo;
             rotationEntry.end_at = DateUtil.getMaximumDate();

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
                },
                error => {
                    LogUtil.info(this, error);
                }
            );
        }
    
    }

    private cleanAttributes(): void {
        this.amount = null;
        this.memo = null;
        this.tags = new Array<Tag>();
        this.isPeriodical = false;
        this.isMonthly = true;
        this.isQuarterly = false;
    

    }

    public changeAlgebraicSignIsMinus(): void {
        if (this.algebraicSignIsMinus) {
            this.algebraicSignIsMinus = false;
        }
        else {
            this.algebraicSignIsMinus = true;
        }
    }

    public changePeriodical() {
        if (this.isPeriodical) {
            this.isPeriodical = false;
        }
        else {
            this.isPeriodical = true;
        }
    }

    private getRotationStrategy(): string {
        if(this.isMonthly){
            return '66122';
        }
        if(this.isQuarterly){
            return '36133';
        }
    }

    private showRadioButtons(): void {
        LogUtil.info(this, "Monatlich     : " + JSON.stringify(this.isMonthly));
        LogUtil.info(this, "Quartalsweise : " + JSON.stringify(this.isQuarterly));
    }

    public setMonthly(): void {
        this.isMonthly = true;
        this.isQuarterly = false;
        this.showRadioButtons();
    }

    public setQuarterly(): void {
        this.isMonthly = false;
        this.isQuarterly = true;
        this.showRadioButtons();
    }

}