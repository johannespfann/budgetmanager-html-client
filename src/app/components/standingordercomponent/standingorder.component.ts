import { Component, OnInit } from '@angular/core';
import { RotationEntryService } from '../../services/rotation-entry.service';
import { RotationEntry } from '../../models/rotationentry';
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
        LogUtil.debug(this, 'init standingorders');
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
                this.updateStandingOrders();
            },
            error => LogUtil.error(this, 'error when getting all useable accounts: ' + JSON.stringify(error))
        );
    }

    public onChangedPressed(event: RotationEntry): void {
        this.rotationEntryService.updateRotationEntry(this.selectedAccountItem, event).subscribe(
            data => {
                this.cleanView();
                this.updateStandingOrders();
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
                this.updateStandingOrders();
            },
            error => {
                LogUtil.error(this, 'delete standingorder -> ' + JSON.stringify(error));
            }
        );
    }

    private updateStandingOrders() {
        this.spinner.show();
        this.rotationEntryService.getRotationEntries(this.selectedAccountItem).subscribe(
            (aRotationEntries: RotationEntry[]) => {
                LogUtil.info(this, 'get all standingOrders ...');
                this.rotationEntries = aRotationEntries;
                this.spinner.hide();
                LogUtil.info(this, 'size: ' + this.rotationEntries.length);
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
