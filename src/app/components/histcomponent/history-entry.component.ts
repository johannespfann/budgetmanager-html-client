import { Component } from '@angular/core';
import { EntryService } from '../../services/entry.service';
import { LogUtil } from '../../utils/log-util';
import { Entry } from '../../models/entry';

@Component({
    selector : 'app-history-entry',
    templateUrl : './history-entry.component.html',
    styleUrls: ['./history-entry.component.css']
})
export class HistoryEntryComponent {

    public editViewIsVisible: boolean;

    public entries: Entry[];
    public selectedEntry: Entry;

    constructor(private entryService: EntryService) {
        LogUtil.debug(this, 'init history-entry-component');
        this.entries = [];
        this.selectedEntry = new Entry();
        this.closeEditView();
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
        this.entryService.update(aEntry).subscribe(
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
        this.entryService.deleteEntry(aEntry).subscribe(
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
        this.entryService.getEntries().subscribe(
            (data: Entry[]) => {
                this.entries = data;
            },
            error => {
                LogUtil.error(this, 'failed to update entries');
                this.entries = [];
            }
        );
    }
}
