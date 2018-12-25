import { Component } from '@angular/core';
import { EntryService } from '../../services/entry.service';
import { LogUtil } from '../../utils/log-util';
import { Entry } from '../../models/entry';
import { EntryPackage } from '../../models/entry-package';
import { Packager } from '../../utils/packager';
import { BalanceManager } from './balance-manager';
import { SortUtil } from '../../utils/sort-util';
import { DateUtil } from '../../utils/date-util';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector : 'app-balance',
    templateUrl : './balance.component.html',
    styleUrls: ['./balance.component.css']
})
export class BalanceComponent {

    public balanceManagers: BalanceManager[] = [];

    constructor(
        private entryService: EntryService,
        private spinner: NgxSpinnerService) {
            LogUtil.debug(this, 'init balance-compoent');
            this.updateEntries();
    }

    private updateEntries(): void {
        this.spinner.show();
        this.entryService.getEntries().subscribe(
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
