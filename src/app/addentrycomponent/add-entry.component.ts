import { Component } from '@angular/core';
import { Tag } from '../models/tag';
import { Entry } from '../models/entry';
import { MathUtil } from '../utils/math-util';
import { EntryService } from '../services/entry.service';
import { LogUtil } from '../utils/log-util';
import { TagService } from '../services/tag.service';
import { RotationEntry } from '../models/rotationentry';
import { RotationEntryService } from '../services/rotation-entry.service';
import { RotationUtil } from '../rotationentrycomponent/rotationutil';
import { DateUtil } from '../utils/date-util';
import { TagStatisticFacade } from '../utils/tag-statistic-facade';
import { TagStatisticService } from '../services/Tag-statistic.service';
import { ApplicationService } from '../application/application.service';
import { TagStatistic } from '../models/tagstatistic';


@Component({
    selector: 'newentry',
    templateUrl: './add-entry.component.html',
    styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent {

    public algebraicSignIsMinus = true;
    public amount: number;
    public memo: string;
    public createEntryDate: Date;

    public startRotationDate: Date;
    public isPeriodical = false;
    public isMonthly = false;
    public isQuarterly = false;
    public isYearly = false;

    private tagStatisticBrowserStorageFacade: TagStatisticFacade;
    public tags: Tag[];
    public possibleTags: Tag[];

    constructor(
        private entryService: EntryService,
        private rotationEntryService: RotationEntryService,
        private tagStatisticService: TagStatisticService,
        private applicationService: ApplicationService) {

        LogUtil.info(this, 'Invoke AddEntryComponent');

        this.tagStatisticBrowserStorageFacade = new TagStatisticFacade(this.applicationService.getCurrentUser());

        this.updateTagStatistics();
        this.resetAttributes();
    }

    public save(): void {

        let amountValue: number;
        if (this.algebraicSignIsMinus) {
            amountValue = MathUtil.convertToNegativ(this.amount);
        } else {
            amountValue = MathUtil.convertToPositiv(this.amount);
        }

        const entry: Entry = Entry.create(amountValue);

        entry.setMemo(this.memo);

        entry.tags = this.tags;
        entry.created_at = this.createEntryDate;

        if (this.isPeriodical) {
             const rotationEntry: RotationEntry = RotationEntry.create(amountValue, this.getRotationStrategy());
             rotationEntry.last_executed = null;
             rotationEntry.start_at = this.startRotationDate;
             rotationEntry.tags = this.tags;
             rotationEntry.memo = this.memo;
             rotationEntry.end_at = DateUtil.getMaximumDate();

             this.rotationEntryService.addRotationEntry(rotationEntry).subscribe(
                 data => {
                     LogUtil.info(this, 'save : ' + JSON.stringify(rotationEntry));

                     this.persistTagToStatistic();
                     this.resetAttributes();
                 });
        }
        if (!this.isPeriodical) {
            LogUtil.info(this, 'Add new Entry: size of tags: ' + entry.tags.length);
            LogUtil.info(this, JSON.stringify(entry));
            this.entryService.addEntry(entry).subscribe(
                data => {
                    LogUtil.info(this, 'save : ' + JSON.stringify(entry));
                    this.persistTagToStatistic();
                    this.resetAttributes();
                },
                error => {
                    LogUtil.info(this, error);
                }
            );
        }
    }

    private resetAttributes(): void {
        this.amount = null;
        this.memo = null;
        this.tags = new Array<Tag>();
        if (this.isPeriodical) {
            this.changePeriodical();
        }
        this.isPeriodical = false;
        this.isMonthly = true;
        this.isQuarterly = false;
        this.isYearly = false;
        this.isPeriodical = false;
        this.createEntryDate = new Date();
        this.startRotationDate = new Date();
        this.updateTagStatistics();
    }

    private persistTagToStatistic(): void {
        this.tagStatisticService.persistTagStatistic(this.tagStatisticBrowserStorageFacade.getTagStatisticValues())
        .subscribe( data => LogUtil.info(this, 'Persist the following tagStatistics: ' + JSON.stringify(this.tagStatisticBrowserStorageFacade.getTagStatisticValues())));
    }

    private updateTagStatistics(): void {
        this.tagStatisticService.getTagStatistic().subscribe((tags: TagStatistic[]) => {
           this.tagStatisticBrowserStorageFacade.persistTagStatisctics(tags);
           this.refreshPossibleTags();
        });
    }

    public changeAlgebraicSignIsMinus(): void {
        if (this.algebraicSignIsMinus) {
            this.algebraicSignIsMinus = false;
        } else {
            this.algebraicSignIsMinus = true;
        }
    }

    public changePeriodical() {
        if (this.isPeriodical) {
            this.isPeriodical = false;
        } else {
            this.isPeriodical = true;
        }
    }

    private getRotationStrategy(): string {
        if (this.isMonthly) {
            return '66122';
        }
        if (this.isQuarterly) {
            return '36133';
        }
        if (this.isYearly) {
            return '5679';
        }
    }

    public setMonthly(): void {
        this.isMonthly = true;
        this.isQuarterly = false;
        this.isYearly = false;
    }

    public setQuarterly(): void {
        this.isMonthly = false;
        this.isQuarterly = true;
        this.isYearly = false;

    }

    public setYearly(): void {
        this.isMonthly = false;
        this.isQuarterly = false;
        this.isYearly = true;
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
