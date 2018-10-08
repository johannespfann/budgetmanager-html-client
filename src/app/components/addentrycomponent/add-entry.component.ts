import { Component, ViewChild, OnInit } from '@angular/core';
import { LogUtil } from '../../utils/log-util';
import { EntryInfoComponent } from '../entryinfocomponent/entry-info.component';
import { StandingOrderInfoComponent } from '../standingorderinfocomponent/standing-order-info.component';
import { RotationEntry } from '../../models/rotationentry';
import { Entry } from '../../models/entry';
import { EntryService } from '../../services/entry.service';
import { RotationEntryService } from '../../services/rotation-entry.service';
import { DateUtil } from '../../utils/date-util';

@Component({
    selector: 'app-newentry',
    templateUrl: './add-entry.component.html',
    styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent implements OnInit {

    @ViewChild(EntryInfoComponent)
    public entryComponent: EntryInfoComponent;

    @ViewChild(StandingOrderInfoComponent)
    public standingOrderComponent: StandingOrderInfoComponent;

    public createEntryDate: Date;
    public isPeriodical = false;

    constructor(
        private entryService: EntryService,
        private rotationService: RotationEntryService) {
        LogUtil.debug(this, 'init add-entry-component');
    }

    public ngOnInit(): void {
        this.isPeriodical = false;
        this.cleanEntryViews();
    }

    public saveEntry(): void {
        const entryInfo = this.entryComponent.getEntryInfo();
        const entry = Entry.create(entryInfo.amount);
        entry.memo = entryInfo.memo;
        entry.tags = entryInfo.tags;
        entry.created_at = this.createEntryDate;

        this.persistEntry(entry);
        this.cleanEntryViews();
    }

    public saveStandingOrder(): void {
        const standingOrderInfo = this.standingOrderComponent.getStandingOrderInfo();
        const entryInfo = this.entryComponent.getEntryInfo();

        const rotationEntry = RotationEntry.create(entryInfo.amount, standingOrderInfo.rotation_strategy);
        rotationEntry.amount = entryInfo.amount;
        rotationEntry.memo = entryInfo.memo;
        rotationEntry.tags = entryInfo.tags;
        rotationEntry.start_at = standingOrderInfo.start_at;
        rotationEntry.last_executed = null;
        rotationEntry.end_at = DateUtil.getMaximumDate();

        this.persistStandingOrder(rotationEntry);
        this.cleanEntryViews();
        this.cleanStandingOrderView();
    }

    public changePeriodical() {
        if (this.isPeriodical) {
            this.isPeriodical = false;
        } else {
            this.isPeriodical = true;
        }
    }

    private cleanEntryViews(): void {
        this.createEntryDate = new Date();
        this.entryComponent.cleanEntryView();
    }

    private cleanStandingOrderView(): void {
        this.standingOrderComponent.cleanStandOrderView();
    }

    private persistEntry(aEntry: Entry): void {
        this.entryService.addEntry(aEntry).subscribe(
            response => {
                LogUtil.debug(this, 'TODO success');
            },
            error => {
                LogUtil.error(this, 'failed to persist entry -> ' + aEntry);
            }
        );
    }

    private persistStandingOrder(aStandingOrder: RotationEntry): void {
        this.rotationService.addRotationEntry(aStandingOrder).subscribe(
            data => {
                LogUtil.debug(this, 'sucess');
            },
            error => {
                LogUtil.error(this, 'failed to persist standingorder -> ' + aStandingOrder);
            }
        );
    }
}
