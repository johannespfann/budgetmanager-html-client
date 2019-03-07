import { Component } from '@angular/core';
import { EntryService } from '../../services/entry.service';
import { LogUtil } from '../../utils/log-util';
import { Entry } from '../../models/entry';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountService } from '../../services/account-service';
import { AccountItem } from '../../models/account-item';
import { ApplicationService } from '../../application/application.service';

@Component({
    selector : 'app-history-entry',
    templateUrl : './history-entry.component.html',
    styleUrls: ['./history-entry.component.css']
})
export class HistoryEntryComponent {

    public editViewIsVisible: boolean;

    public entries: Entry[];
    public selectedEntry: Entry;

    public accountItems: AccountItem[] = [];
    public selectedAccount: AccountItem;

    constructor(
        private applicationService: ApplicationService,
        private accountService: AccountService,
        private entryService: EntryService,
        private spinner: NgxSpinnerService) {
        LogUtil.logInits(this, 'init history-entry-component');
        this.entries = [];
        this.selectedEntry = new Entry();
        this.closeEditView();
        this.updateAccountItems();
        this.initView();
    }

    private updateAccountItems(): void {
        this.selectedAccount = this.applicationService.getCurrentAccount();
    }

    private initView(): void {
        this.updateEntries();
    }

    public onDeletePressed(aEntry: Entry): void {
        this.deleteEntry(aEntry);
    }

    public onEditPressed(aEntry: Entry): void {
         this.selectedEntry = aEntry;
         this.showEditView();
    }

    public onEditedPressed(aEntry: Entry): void {
        this.editEntry(aEntry);
    }

    public onCancelPressed(aPressed: boolean): void {
        this.closeEditView();
        this.selectedEntry = null;
    }

    private closeEditView(): void {
        this.editViewIsVisible = false;
    }

    private showEditView(): void {
        this.editViewIsVisible = true;
    }

    private editEntry(aEntry: Entry): void {
        this.entryService.update(this.selectedAccount, aEntry).subscribe(
            data => {
                this.updateEntries();
                this.closeEditView();
            },
            error => {
                LogUtil.error(this, 'failt to edit entry -> ' + JSON.stringify(aEntry));
            }
        );
    }

    private deleteEntry(aEntry: Entry): void {
        this.entryService.deleteEntry(this.selectedAccount, aEntry).subscribe(
            data => {
                this.updateEntries();
                this.closeEditView();
            },
            error => {
                LogUtil.error(this, 'failed to delete entry -> ' + JSON.stringify(aEntry));
            }
        );
    }

    private updateEntries(): void {
        this.spinner.show();
        this.entryService.getEntries(this.selectedAccount).subscribe(
            (data: Entry[]) => {
                this.entries = data;
                this.spinner.hide();
            },
            error => {
                LogUtil.error(this, 'failed to update entries');
                this.entries = [];
                this.spinner.hide();
            }
        );
    }

}
