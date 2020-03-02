import { Component, ViewChild, OnInit } from '@angular/core';
import { LogUtil } from '../utils/log-util';
import { EntryInfoComponent } from '../shared/entryinfocomponent/entry-info.component';
import { StandingOrderInfoComponent } from '../shared/standingorderinfocomponent/standing-order-info.component';
import { StandingOrder } from '../models/standingorder';
import { Entry } from '../models/entry';
import { EntryService } from '../services/entry.service';
import { DateUtil } from '../utils/date-util';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountService } from '../services/account-service';
import { AccountItem } from '../models/account-item';
import { StandingOrderService } from '../services/standing-order.service';
import { MessagingService } from '../messages/message.service';
import { AddedNewStandingOrderMessage } from '../messages/added-new-standing-order-message';
import { ApplicationService } from '../application/application.service';

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

    public selectedAccount: AccountItem;

    constructor(
        private applicationService: ApplicationService,
        private messageService: MessagingService,
        private entryService: EntryService,
        private rotationService: StandingOrderService,
        private spinner: NgxSpinnerService) {
        LogUtil.logInits(this, 'init add-entry-component');
    }

    public ngOnInit(): void {
        this.isPeriodical = false;
        this.updateAccountItems();
        this.cleanEntryViews();
    }

    private updateAccountItems(): void {
        this.selectedAccount = this.applicationService.getCurrentAccount();
    }

    public saveEntry(): void {
        const entryInfo = this.entryComponent.getEntryInfo();
        const entry = Entry.create(entryInfo.amount, 'EUR');
        entry.memo = entryInfo.memo;
        entry.tags = entryInfo.tags;
        entry.created_at = this.createEntryDate;

        this.persistEntry(entry);
        this.cleanEntryViews();
    }

    public saveStandingOrder(): void {
        const standingOrderInfo = this.standingOrderComponent.getStandingOrderInfo();
        const entryInfo = this.entryComponent.getEntryInfo();

        const rotationEntry = StandingOrder.create(entryInfo.amount, 'EUR', standingOrderInfo.rotation_strategy);
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
        this.spinner.show();

        this.entryService.addEntry(this.selectedAccount, aEntry).subscribe(
            response => {
                LogUtil.debug(this, 'Persist Entry' + JSON.stringify(aEntry));
                this.spinner.hide();
            },
            error => {
                LogUtil.error(this, 'failed to persist entry -> ' + JSON.stringify(aEntry));
                this.spinner.hide();
            }
        );
    }

    private persistStandingOrder(aStandingOrder: StandingOrder): void {
        this.spinner.show();
        this.rotationService.addRotationEntry(this.selectedAccount, aStandingOrder).subscribe(
            data => {
                LogUtil.debug(this, 'Persist StandingOrder' + JSON.stringify(aStandingOrder));
                this.messageService.publish(new AddedNewStandingOrderMessage(this.selectedAccount));
                this.spinner.hide();
            },
            error => {
                LogUtil.error(this, 'failed to persist standingorder -> ' + aStandingOrder);
                this.spinner.hide();
            }
        );
    }
}
