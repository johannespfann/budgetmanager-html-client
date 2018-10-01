import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Entry } from '../../models/entry';
import { EntryService } from '../../services/entry.service';
import { LogUtil } from '../../utils/log-util';
import { Tag } from '../../models/tag';
import { MessagingService } from '../../messages/message.service';
import { EntryUpdatedMessage } from '../../messages/entry-updated-message';
import { TagsComponent } from '../tags';
import { MathUtil } from '../../utils/math-util';
import { TagStatisticFacade } from '../../utils/tag-statistic-facade';
import { TagStatistic } from '../../models/tagstatistic';
import { TagStatisticService } from '../../services/tag-statistic.service';
import { ApplicationService } from '../../application/application.service';

@Component({
    selector: 'edit-entry-component',
    templateUrl: './edit-entry.component.html',
    styleUrls: ['./edit-entry.component.css']
})
export class EditEntryComponent {

    @Input()
    public entry: Entry;

    // @ViewChild('tagsComponent1')
    @ViewChild(TagsComponent)
    public tagsComponent: TagsComponent;


    public amount: number;
    public memo: string;

    public hash: string;

    public editEntry: Entry;

    public algebraicSignIsMinus = true;
    public tags: Tag[];
    public possibleTags: Tag[];

    private tagStatisticBrowserStorageFacade: TagStatisticFacade;

    constructor(
        private entryService: EntryService,
        private messageService: MessagingService,
        private tagStatisticService: TagStatisticService,
        private applicationService: ApplicationService) {

            LogUtil.debug(this, 'Init EditEntryComponent');

            this.tagStatisticBrowserStorageFacade = new TagStatisticFacade(this.applicationService.getCurrentUser());

            this.updateTagStatistics();
            this.resetAttributes();
    }

    private ngOnInit() {
        this.editEntry = Entry.copy(this.entry);
        this.amount = this.initAmount(this.editEntry.amount);
        this.memo = this.editEntry.memo;
        this.tags = this.editEntry.tags;
        this.hash = this.editEntry.hash;
    }

    public update() {
        const amountValue = 0;
        if (this.algebraicSignIsMinus) {
            this.editEntry.amount = MathUtil.convertToNegativ(this.amount);
        } else {
            this.editEntry.amount = MathUtil.convertToPositiv(this.amount);
        }

        this.editEntry.memo = this.memo;
        this.editEntry.tags = this.tags;

        this.persistTagToStatistic();
        this.entryService.update(this.editEntry).subscribe(data => {
            this.resetAttributes();
            this.messageService.publish(new EntryUpdatedMessage());
        });
    }

    private initAmount(aAmount: number): number {
        if (aAmount >= 0) {
            this.algebraicSignIsMinus = false;
            return aAmount;
        } else {
            this.algebraicSignIsMinus = true;
            return aAmount * (-1);
        }
    }

    public changeAlgebraicSignIsMinus(): void {
        if (this.algebraicSignIsMinus){
            this.algebraicSignIsMinus = false;
        } else {
            this.algebraicSignIsMinus = true;
        }
    }

    private resetAttributes(): void {
        this.tags = new Array<Tag>();
        this.amount = 0;
        this.algebraicSignIsMinus = true;
        this.memo = '';
        this.updateTagStatistics();
    }

    private persistTagToStatistic(): void {
        this.tagStatisticService.persistTagStatistic(this.tagStatisticBrowserStorageFacade.getTagStatisticValues())
        .subscribe();
    }

    private updateTagStatistics(): void {
        this.tagStatisticService.getTagStatistic().subscribe((tags: TagStatistic[])=>{
            LogUtil.info(this, 'Get the following tags -> ' + JSON.stringify(tags));
           this.tagStatisticBrowserStorageFacade.persistTagStatisctics(tags);
           this.refreshPossibleTags();
        });
    }

    public onAddedTag(tag: Tag): void {
        this.tagStatisticBrowserStorageFacade.pushTag(tag);
        this.refreshPossibleTags();
    }

    public onTagDeleted(tag: Tag): void {
        this.tagStatisticBrowserStorageFacade.deleteTag(tag);
        this.refreshPossibleTags();
    }

    public refreshPossibleTags(): void {
        const tagStatisticList: TagStatistic[] = this.tagStatisticBrowserStorageFacade.getTagStatisticValues();
        this.possibleTags = [];
        tagStatisticList.forEach((data: TagStatistic) => {
            const tag: Tag = new Tag();
            tag.name = data.name;
            this.possibleTags.push(tag);
        });
    }


}
