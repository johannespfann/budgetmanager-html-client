import { Component } from '@angular/core';
import { LogUtil } from '../../utils/log-util';
import { Entry } from '../../models/entry';
import { EntryPackage } from '../../models/entry-package';
import { Packager } from '../../utils/packager';
import { BalanceManager } from './balance-manager';
import { SortUtil } from '../../utils/sort-util';
import { DateUtil } from '../../utils/date-util';
import { NgxSpinnerService } from 'ngx-spinner';
import { EntryService } from '../../services/entry.service';
import { AccountService } from '../../services/account-service';
import { AccountItem } from '../../models/account-item';

@Component({
    selector : 'app-balance',
    templateUrl : './balance.component.html',
    styleUrls: ['./balance.component.css']
})
export class BalanceComponent {

    public balanceManagers: BalanceManager[] = [];

    public accountItems: AccountItem[] = [];

    public selectedAccountItem: AccountItem;

    constructor(
        private entryService: EntryService,
        private accountService: AccountService,
        private spinner: NgxSpinnerService) {
            LogUtil.logInits(this, 'init balance-compoent');

        this.updateAccountItems();
    }

    private updateAccountItems(): void {
        this.accountService.getAllUseableAccounts().subscribe(
            (accountItems: AccountItem[]) => {
                this.accountItems = accountItems;
                accountItems.forEach( x => JSON.stringify(x));
                this.selectedAccountItem = accountItems[0];
                this.updateEntries();
            },
            error => LogUtil.error(this, 'error when getting all useable accounts: ' + JSON.stringify(error))
        );
    }

    private updateEntries(): void {
        this.spinner.show();
        this.entryService.getEntries(this.selectedAccountItem).subscribe(
            (entries: Entry[] ) => {
            const entryPackagers = this.splitEntriesInPackages(entries);
            const packagerMangeres = this.convertPackagesInPackageManager(entryPackagers);
            this.balanceManagers = packagerMangeres;
            this.spinner.hide();
        }, error => {

            this.spinner.hide();
        });
    }

    private splitEntriesInPackages(aEntries: Entry[]): EntryPackage[] {
        const entryPackager = new Packager();
        return entryPackager.splitInMonth(SortUtil.sortEntriesByTimeDESC(aEntries));
    }

    private convertPackagesInPackageManager(packages: EntryPackage[]): BalanceManager[] {
        const balanceManagers: BalanceManager[] = [];
        const newPackages = SortUtil.sortPackagesByTimeASC(packages);

        newPackages.forEach( (entryPackage: EntryPackage) => {
            const nameOfManager = DateUtil.getNameOfMonth(entryPackage.date) + ' ' + entryPackage.date.getFullYear();
            const packageManager = new BalanceManager(nameOfManager, entryPackage.entries);
            balanceManagers.push(packageManager);
        });

        return balanceManagers;
    }

}
