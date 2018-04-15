import { Component, Input, AfterViewInit, AfterViewChecked, OnInit, EventEmitter, Output } from "@angular/core";
import { LogUtil } from "../utils/log-util";
import { RotationEntry } from "../models/rotationentry";
import { Tag } from "../models/tag";
import { RotationUtil } from "./rotationutil";
import { TagService } from "../services/tag.service";
import { RotationEntryService } from "../services/rotation-entry.service";
import { MathUtil } from "../utils/math-util";


@Component({
    selector: 'rotation-entry-edit',
    templateUrl: './rotation-entry-edit.component.html'
})
export class RotationEntryEditComponent implements  OnInit{

    @Input()
    public rotationEntry: RotationEntry;

    @Output()
    public updatedDone = new EventEmitter<boolean>();

    private algebraicSignIsMinus: boolean = true;

    private amount: number;
    private memo: string;


    private tags: Tag[];

    private possibleTags: Tag[];

    private currentTag: string;

    private startRotationDate: Date; 

    private hash: string;

    private rotation_strategy: string;

    private end_at: Date;

    private last_executed: Date;

    private categoriesStrings: Array<string>;

    constructor(
        private rotationEntryService: RotationEntryService,
        private tagService: TagService
    ){
        LogUtil.info(this,'Init RotationEntryEditComponent');
        
        tagService.getTags().subscribe( (tags: Array<Tag>) => {
            this.possibleTags = tags 
        });
    }

    public ngOnInit(): void {
        this.initView();
    }

    public save(){
        let rotationEntry = new RotationEntry();
      

        let amountValue: number;

        if (this.algebraicSignIsMinus) {
            amountValue = MathUtil.convertToNegativ(this.amount);
        }
        else {
            amountValue = MathUtil.convertToPositiv(this.amount);
        }

        rotationEntry.amount = amountValue;
        rotationEntry.end_at = this.end_at;
        rotationEntry.hash = this.hash;
        rotationEntry.last_executed = this.last_executed;
        rotationEntry.memo = this.memo;
        rotationEntry.rotation_strategy = this.rotation_strategy;
        rotationEntry.start_at = this.startRotationDate;
        rotationEntry.tags = this.tags;

        this.rotationEntryService.updateRotationEntry(rotationEntry).subscribe(
            data => {
                LogUtil.info(this, 'Saved: ' + JSON.stringify(rotationEntry));
                LogUtil.info(this,'invoke closeDone');
                this.updatedDone.emit(false);
            }
        )
    }

    private initView(): void {
        this.hash = this.rotationEntry.hash;
        this.amount = this.rotationEntry.amount;

        if(this.amount > 0){
            this.algebraicSignIsMinus = false;
        }
        else{
            this.algebraicSignIsMinus = true;
        }

        this.amount = MathUtil.convertToPositiv(this.amount);

        this.memo = this.rotationEntry.memo;
        this.end_at = this.rotationEntry.end_at;
        this.tags = this.rotationEntry.tags;
        this.startRotationDate = this.rotationEntry.start_at;
        this.rotation_strategy = this.rotationEntry.rotation_strategy;
    }

    private changeAlgebraicSignIsMinus(): void {
        if (this.algebraicSignIsMinus) {
            this.algebraicSignIsMinus = false;
        }
        else {
            this.algebraicSignIsMinus = true;
        }
    }


}