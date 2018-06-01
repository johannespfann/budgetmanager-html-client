import { Component, Input, AfterViewInit, AfterViewChecked, OnInit, EventEmitter, Output } from "@angular/core";
import { LogUtil } from "../utils/log-util";
import { RotationEntry } from "../models/rotationentry";
import { Tag } from "../models/tag";
import { RotationUtil } from "./rotationutil";
import { TagService } from "../services/tag.service";
import { RotationEntryService } from "../services/rotation-entry.service";
import { MathUtil } from "../utils/math-util";
import { TagStatisticService } from "../services/Tag-statistic.service";
import { ApplicationService } from "../application/application.service";
import { TagStatisticFacade } from "../utils/tag-statistic-facade";
import { TagStatistic } from "../models/tagstatistic";


@Component({
    selector: 'rotation-entry-edit',
    templateUrl: './rotation-entry-edit.component.html'
})
export class RotationEntryEditComponent implements  OnInit{

    @Input()
    public rotationEntry: RotationEntry;

    @Output()
    public updatedDone = new EventEmitter<boolean>();

    public algebraicSignIsMinus=  true;

    public amount: number;
    public memo: string;

    private tagStatisticBrowserStorageFacade: TagStatisticFacade;
    public tags: Tag[];
    public possibleTags: Tag[];

    public currentTag: string;

    public startRotationDate: Date;

    public hash: string;

    public rotation_strategy: string;

    public end_at: Date;

    public last_executed: Date;

    public categoriesStrings: Array<string>;

    constructor(
        private rotationEntryService: RotationEntryService,
        private tagStatisticService: TagStatisticService,
        private applicationService: ApplicationService
    ){
        LogUtil.info(this, 'Init RotationEntryEditComponent');

        this.tagStatisticBrowserStorageFacade = new TagStatisticFacade(this.applicationService.getCurrentUser());
        this.updateTagStatistics();
    }

    public ngOnInit(): void {
        this.initView();
    }

    public save(){
        const rotationEntry = new RotationEntry();


        let amountValue: number;

        if (this.algebraicSignIsMinus) {
            amountValue = MathUtil.convertToNegativ(this.amount);
        } else {
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
                LogUtil.info(this, 'invoke closeDone');
                this.persistTagToStatistic();
                this.updatedDone.emit(false);
            });
    }

    private initView(): void {
        this.hash = this.rotationEntry.hash;
        this.amount = this.rotationEntry.amount;

        if (this.amount > 0) {
            this.algebraicSignIsMinus = false;
        }else {
            this.algebraicSignIsMinus = true;
        }

        this.amount = MathUtil.convertToPositiv(this.amount);

        this.memo = this.rotationEntry.memo;
        this.end_at = this.rotationEntry.end_at;
        this.tags = this.rotationEntry.tags;
        this.startRotationDate = this.rotationEntry.start_at;
        this.rotation_strategy = this.rotationEntry.rotation_strategy;
        this.updateTagStatistics();
    }

    public changeAlgebraicSignIsMinus(): void {
        if (this.algebraicSignIsMinus) {
            this.algebraicSignIsMinus = false;
        }else {
            this.algebraicSignIsMinus = true;
        }
    }

    private persistTagToStatistic(): void {
        this.tagStatisticService.persistTagStatistic(this.tagStatisticBrowserStorageFacade.getTagStatisticValues())
        .subscribe( data => LogUtil.info(this, 'Persist the following tagStatistics: ' + JSON.stringify(this.tagStatisticBrowserStorageFacade.getTagStatisticValues())));
    }

    private updateTagStatistics(): void {
        this.tagStatisticService.getTagStatistic().subscribe((tags: TagStatistic[])=>{
            LogUtil.info(this, 'Get the following tags -> ' + JSON.stringify(tags));
           this.tagStatisticBrowserStorageFacade.persistTagStatisctics(tags);
           this.refreshPossibleTags();
        });
    }

    public onAddedTag(tag: Tag): void {
        LogUtil.info(this, 'added new Tag' + JSON.stringify(tag));
        this.tagStatisticBrowserStorageFacade.pushTag(tag);
        this.refreshPossibleTags();
    }

    public onTagDeleted(tag: Tag): void {
        LogUtil.info(this, 'removed new Tag' + JSON.stringify(tag));
        this.tagStatisticBrowserStorageFacade.deleteTag(tag);
        this.refreshPossibleTags();
    }

    public refreshPossibleTags(): void {
        const tagStatisticList: TagStatistic[] = this.tagStatisticBrowserStorageFacade.getTagStatisticValues();
        this.possibleTags = [];
        tagStatisticList.forEach((tagStatistic: TagStatistic) => {
            const tag: Tag = new Tag();
            tag.name = tagStatistic.name;
            this.possibleTags.push(tag);
        });
    }
}
