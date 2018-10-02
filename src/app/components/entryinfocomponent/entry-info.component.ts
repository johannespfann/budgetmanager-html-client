import { Component } from '@angular/core';
import { EntryInfo } from './entry-info';
import { Tag } from '../../models/tag';
import { LogUtil } from '../../utils/log-util';
import { TagStatisticFacade } from '../../utils/tag-statistic-facade';
import { TagStatistic } from '../../models/tagstatistic';
import { ApplicationService } from '../../application/application.service';
import { TagStatisticService } from '../../services/tag-statistic.service';
import { MathUtil } from '../../utils/math-util';

@Component({
    selector: 'app-entry-info',
    templateUrl: './entry-info.component.html',
    styleUrls: ['./entry-info.component.css']
})
export class EntryInfoComponent {

    public algebraicSignIsMinus = true;
    public amount: number;
    public memo: string;

    public tags: Tag[];
    public possibleTags: Tag[];

    private tagStatisticBrowserStorageFacade: TagStatisticFacade;

    constructor(
        private tagStatisticService: TagStatisticService,
        private applicationService: ApplicationService) {

        LogUtil.debug(this, 'init entrycomponent');
        this.tagStatisticBrowserStorageFacade = new TagStatisticFacade(this.applicationService.getCurrentUser());
    }

    public cleanEntryView(): void {
        this.updateTagStatistics();
        this.amount = 0;
        this.memo = '';
        this.tags = [];
    }

    public initEntryView(aEntryInfo: EntryInfo): void {
        this.cleanEntryView();
        if (aEntryInfo.amount < 0) {
            this.algebraicSignIsMinus = true;
        } else {
            this.algebraicSignIsMinus = false;
        }
        this.amount = MathUtil.convertToPositiv(aEntryInfo.amount);
        this.memo = aEntryInfo.memo;
        this.tags = aEntryInfo.tags;
    }

    public getEntryInfo(): EntryInfo {
        this.persistTagToStatistic();
        let amountValue: number;
        if (this.algebraicSignIsMinus) {
            amountValue = MathUtil.convertToNegativ(this.amount);
        } else {
            amountValue = MathUtil.convertToPositiv(this.amount);
        }
        const entryInfo = new EntryInfo();
        entryInfo.amount = amountValue;
        entryInfo.memo = this.memo;
        entryInfo.tags = this.tags;
        return entryInfo;
    }

    public changeAlgebraicSignIsMinus(): void {
        if (this.algebraicSignIsMinus) {
            this.algebraicSignIsMinus = false;
        } else {
            this.algebraicSignIsMinus = true;
        }
    }

    public onAddedTag(tag: Tag): void {
        LogUtil.debug(this, 'onAddedTag ' + tag);
    }

    public onTagDeleted(tag: Tag): void {
        LogUtil.debug(this, 'onTagDeleted ' + tag);
    }

    private refreshPossibleTags(): void {
        const tagStatisticList: TagStatistic[] = this.tagStatisticBrowserStorageFacade.getTagStatisticValues();
        this.possibleTags = [];
        tagStatisticList.forEach((tagStatistic: TagStatistic) => {
            const tag: Tag = new Tag();
            tag.name = tagStatistic.name;
            this.possibleTags.push(tag);
        });
    }

    private persistTagToStatistic(): void {
        this.tagStatisticService.persistTagStatistic(this.tagStatisticBrowserStorageFacade.getTagStatisticValues()).subscribe();
    }

    private updateTagStatistics(): void {
        this.tagStatisticService.getTagStatistic().subscribe((tags: TagStatistic[]) => {
           this.tagStatisticBrowserStorageFacade.persistTagStatisctics(tags);
           this.refreshPossibleTags();
        });
    }
}
