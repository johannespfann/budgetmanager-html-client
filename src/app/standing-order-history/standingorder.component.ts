import { Component, OnInit } from '@angular/core';
import { RotationEntry } from '../models/standingorder';
import { LogUtil } from '../utils/log-util';
import { NgxSpinnerService } from 'ngx-spinner';
import { StandingOrderService } from '../services/standing-order.service';
import { AccountItem } from '../models/account-item';
import { ApplicationService } from '../application/application.service';

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
        private applicationService: ApplicationService,
        private rotationEntryService: StandingOrderService,
        private spinner: NgxSpinnerService) {
        LogUtil.logInits(this, 'init standingorders');
    }

    public ngOnInit(): void {
        this.cleanView();
        this.updateAccountItems();
        this.updateStandingOrders(this.selectedAccountItem);
    }

    public onEditPressed(entry: RotationEntry): void {
        this.showEditView();
        this.selectedStandingOrder = entry;
    }

    public onCancelPressed(event: boolean): void {
        this.cleanView();
    }

    private updateAccountItems(): void {
        this.selectedAccountItem = this.applicationService.getCurrentAccount();
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
