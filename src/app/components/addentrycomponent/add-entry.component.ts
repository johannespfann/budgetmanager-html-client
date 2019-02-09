import { Component, ViewChild, OnInit } from '@angular/core';
import { LogUtil } from '../../utils/log-util';
import { EntryInfoComponent } from '../entryinfocomponent/entry-info.component';
import { StandingOrderInfoComponent } from '../standingorderinfocomponent/standing-order-info.component';
import { RotationEntry } from '../../models/rotationentry';
import { Entry } from '../../models/entry';
import { EntryV2Service } from '../../services/entryV2.service';
import { DateUtil } from '../../utils/date-util';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountService } from '../../services/account-service';
import { AccountItem } from '../../models/account-item';
import { StandingOrderService } from '../../services/standing-order.service';

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

    public accountItems: AccountItem[] = [];
    public selectedAccount: AccountItem;

    constructor(
        private accountService: AccountService,
        private entryService: EntryV2Service,
        private rotationService: StandingOrderService,
        private spinner: NgxSpinnerService) {
        LogUtil.debug(this, 'init add-entry-component');
    }

    public ngOnInit(): void {
        this.isPeriodical = false;
        this.updateAccountItems();
        this.cleanEntryViews();
    }

    private updateAccountItems(): void {
        this.accountService.getAllUseableAccounts().subscribe(
            (accountItems: AccountItem[]) => {
                this.accountItems = accountItems;
                accountItems.forEach( x => JSON.stringify(x));
                this.selectedAccount = accountItems[0];
            },
            error => LogUtil.error(this, 'error when getting all useable accounts: ' + JSON.stringify(error))
        );
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

        const rotationEntry = RotationEntry.create(entryInfo.amount, 'EUR', standingOrderInfo.rotation_strategy);
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
                LogUtil.error(this, ' ...  -> ' + JSON.stringify(error));
                this.spinner.hide();
            }
        );
    }

    private persistStandingOrder(aStandingOrder: RotationEntry): void {
        this.spinner.show();
        this.rotationService.addRotationEntry(this.selectedAccount, aStandingOrder).subscribe(
            data => {
                LogUtil.debug(this, 'Persist StandingOrder' + JSON.stringify(aStandingOrder));
                this.spinner.hide();
            },
            error => {
                LogUtil.error(this, 'failed to persist standingorder -> ' + aStandingOrder);
                this.spinner.hide();
            }
        );
    }
}
