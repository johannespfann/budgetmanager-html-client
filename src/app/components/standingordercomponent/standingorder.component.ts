import { Component, OnInit } from '@angular/core';
import { RotationEntry } from '../../models/standingorder';
import { LogUtil } from '../../utils/log-util';
import { NgxSpinnerService } from 'ngx-spinner';
import { StandingOrderService } from '../../services/standing-order.service';
import { AccountService } from '../../services/account-service';
import { AccountItem } from '../../models/account-item';

@Component({
    selector: 'app-standingorder-component',
    templateUrl: './standingorder.component.html',
    styleUrls: ['./standingorder.component.css']
})
export class StandingOrderComponent implements OnInit {

    public rotationEntries: RotationEntry[];

    public selectedStandingOrder: RotationEntry;

    public accountItems: AccountItem[];
    public selectedAccountItem: AccountItem;

    public isViewVisible: boolean;

    constructor(
        private accountService: AccountService,
        private rotationEntryService: StandingOrderService,
        private spinner: NgxSpinnerService) {
        LogUtil.logInits(this, 'init standingorders');
    }

    public ngOnInit(): void {
        this.cleanView();
        this.updateAccountItems();
    }

    public onEditPressed(entry: RotationEntry): void {
        this.showEditView();
        this.selectedStandingOrder = entry;
    }

    public onCancelPressed(event: boolean): void {
        this.cleanView();
    }

    private updateAccountItems(): void {
        this.accountService.getAllUseableAccounts().subscribe(
            (accountItems: AccountItem[]) => {
                this.accountItems = accountItems;
                accountItems.forEach( x => JSON.stringify(x));
                this.selectedAccountItem = accountItems[0];
                this.updateStandingOrders(accountItems[0]);
            },
            error => LogUtil.error(this, 'error when getting all useable accounts: ' + JSON.stringify(error))
        );
    }

    public onChangedPressed(event: RotationEntry): void {
        this.rotationEntryService.updateRotationEntry(this.selectedAccountItem, event).subscribe(
            data => {
                this.cleanView();
                this.updateStandingOrders(this.selectedAccountItem);
            },
            error => {
                LogUtil.error(this, 'change standingorder -> ' + JSON.stringify(error));
            }
        );
    }

    public onDeletedPressed(event: RotationEntry): void {
        this.rotationEntryService.deleteRotationEntry(this.selectedAccountItem, event).subscribe(
            data => {
                this.cleanView();
                this.updateStandingOrders(this.selectedAccountItem);
            },
            error => {
                LogUtil.error(this, 'delete standingorder -> ' + JSON.stringify(error));
            }
        );
    }

    private updateStandingOrders(accountItem: AccountItem) {

        if (!accountItem) {
            LogUtil.info(this, 'Accountitem was undefined');
            return;
        }

        this.spinner.show();
        this.rotationEntryService.getRotationEntries(accountItem).subscribe(
            (aRotationEntries: RotationEntry[]) => {
                this.rotationEntries = aRotationEntries;

                aRotationEntries.forEach( x => LogUtil.info(this, JSON.stringify(x)));

                this.spinner.hide();
            },
            error => {
                LogUtil.error(this, 'Error was found! -> ' + JSON.stringify(error));
                this.rotationEntries = new Array<RotationEntry>();
                this.spinner.hide();
            }
        );
    }

    private cleanView(): void {
        this.isViewVisible = false;

    }

    private showEditView(): void {
        this.isViewVisible = true;
    }

}
