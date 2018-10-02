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
        LogUtil.info(this, 'init history-entry-component');
        this.entries = [];
        this.selectedEntry = new Entry();
        this.closeEditView();
        this.updateEntries();
    }


    public onDeletePressed(aEntry: Entry): void {
        LogUtil.info(this, 'onDeletedPressed -> ' + JSON.stringify(aEntry));
        this.deleteEntry(aEntry);
    }

    public onEditPressed(aEntry: Entry): void {
         LogUtil.info(this, 'onEditPressed -> ' + JSON.stringify(aEntry));
         this.selectedEntry = aEntry;
         this.showEditView();
    }

    public onEditedPressed(aEntry: Entry): void {
        LogUtil.info(this, 'onEditedPressed -> ' + JSON.stringify(aEntry));
        this.editEntry(aEntry);
    }

    public onCancelPressed(aPressed: boolean): void {
        LogUtil.info(this, 'onCancelPressed -> ' + JSON.stringify(aPressed));
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
                LogUtil.info(this, 'edit entry -> ' + JSON.stringify(aEntry));
                this.updateEntries();
                this.closeEditView();
            },
            error => {
                LogUtil.info(this, 'failt to edit entry -> ' + JSON.stringify(aEntry));
            }
        )
    }

    private deleteEntry(aEntry: Entry): void {
        this.entryService.deleteEntry(aEntry).subscribe(
            data => {
                LogUtil.info(this, 'deleted entry -> ' + JSON.stringify(aEntry));
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
                LogUtil.info(this, 'update entries');
                this.entries = data;
            },
            error => {
                LogUtil.error(this, 'failed to update entries');
                this.entries = [];
            }
        );
    }
}
