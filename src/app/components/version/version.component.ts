import { Component, OnInit } from '@angular/core';
import { LogUtil } from '../../utils/log-util';
import { EntryService } from '../../services/entry.service';
import { EntryV2Service } from '../../services/entryV2.service';
import { RotationEntryService } from '../../services/rotation-entry.service';
import { StandingOrderService } from '../../services/standing-order.service';
import { AccountService } from '../../services/account-service';
import { Entry } from '../../models/entry';
import { RotationEntry } from '../../models/rotationentry';
import { AccountItem } from '../../models/account-item';

@Component({
    selector: 'app-versions',
    templateUrl: './version.component.html',
    styleUrls: ['./version.component.css']
})
export class VersionComponent implements OnInit  {


    private selectedAccount: AccountItem;
    private accountItems: AccountItem[];

    public isNotUseable = true;

    constructor(
        private oldEntryService: EntryService,
        private newEntryservice: EntryV2Service,
        private oldRotationService: RotationEntryService,
        private newStandingOrderservice: StandingOrderService,
        private accountService: AccountService) {
        LogUtil.logInits(this, 'init version-component');
    }

    public ngOnInit(): void {
        this.updateAccountItems();
    }

    private updateAccountItems(): void {
        this.accountService.getAllUseableAccounts().subscribe(
            (accountItems: AccountItem[]) => {
                this.accountItems = accountItems;
                accountItems.forEach( x => JSON.stringify(x));
                this.selectedAccount = accountItems[0];
                this.isNotUseable = false;
            },
            error => LogUtil.error(this, 'error when getting all useable accounts: ' + JSON.stringify(error))
        );
    }


    public copyEntries(): void {
        LogUtil.info(this, 'Clicked copyEntry');
        this.showOldEntries();
    }

    public copyStandingOrders(): void {
        LogUtil.info(this, 'Clicked copyStandingOders');
        this.showOldStandingOrders();
    }


    public showOldEntries(): void {
        this.oldEntryService.getEntries().subscribe((data: Entry[]) => {
            data.forEach(x => {
                x.currency = 'EUR';
                LogUtil.info(this, JSON.stringify(x));
            });

            this.newEntryservice.addEntries(this.selectedAccount, data).subscribe( response => LogUtil.info(this, 'done!'));
        });
    }

    public showOldStandingOrders(): void {
        this.oldRotationService.getRotationEntries().subscribe((data: RotationEntry[]) => {
            data.forEach(x => {
                x.currency = 'EUR';
                LogUtil.info(this, JSON.stringify(x));
            });

            this.newStandingOrderservice.addStandingOrders(this.selectedAccount, data).subscribe( response => LogUtil.info(this, 'done!'));
        });
    }

}
