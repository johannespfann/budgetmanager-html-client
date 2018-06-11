import { Component } from '@angular/core';
import { ApplicationService } from '../application/application.service';
import { EntryService } from '../services/entry.service';
import { LogUtil } from '../utils/log-util';
import { Entry } from '../models/entry';
import { EntryPackage } from '../historycomponent/entry-package';
import { Packager } from '../utils/packager';
import { BalanceManager } from './balance-manager';

@Component({
    selector : 'balance',
    templateUrl : './balance.component.html'
})
export class BalanceComponent {

    public balanceManagers: BalanceManager[] = [];

    constructor(
        private applicationService: ApplicationService,
        private entryService: EntryService) {
            LogUtil.info(this, 'Init BalanceCompoent');
            this.updateEntries();
    }

    private updateEntries(): void {
        this.entryService.getEntries().subscribe( (entries: Entry[] ) => {
            LogUtil.info(this, 'Get entries: ' + entries.length);
            const entryPackagers = this.splitEntriesInPackages(entries);
            LogUtil.info(this, 'Found ' + entryPackagers.length + ' packages of entries');
            const packagerMangeres = this.convertPackagesInPackageManager(entryPackagers);
            LogUtil.info(this, 'Convert ' + packagerMangeres.length + ' packages to PackageManager');
            this.balanceManagers = packagerMangeres;
        });
    }

    private splitEntriesInPackages(aEntries: Entry[]): EntryPackage[] {
        const entryPackager = new Packager();
        return entryPackager.splitInMonth(aEntries);
    }

    private convertPackagesInPackageManager(packages: EntryPackage[]): BalanceManager[] {
        const balanceManagers: BalanceManager[] = [];

        packages.forEach( (entryPackage: EntryPackage) => {
            const packageManager = new BalanceManager('kein name ', entryPackage.entries);
            balanceManagers.push(packageManager);
        });

        return balanceManagers;
    }

}
