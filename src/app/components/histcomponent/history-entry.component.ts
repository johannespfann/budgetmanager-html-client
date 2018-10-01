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

    public entries: Entry[];
    public selectedEntry: Entry;

    constructor(private entryService: EntryService) {
        LogUtil.info(this, 'init history-entry-component');
        this.entries = [];
        this.selectedEntry = new Entry();
        this.updateEntries();
    }


    public onDeletePressed(aEntry: Entry): void {
        LogUtil.info(this, 'onDeletedPressed -> ' + JSON.stringify(aEntry));
    }

    public onEditPressed(aEntry: Entry): void {
         LogUtil.info(this, 'onEditPressed -> ' + JSON.stringify(aEntry));
    }

    public onEditedPressed(aEntry: Entry): void {
        LogUtil.info(this, 'onEditedPressed -> ' + JSON.stringify(aEntry));
    }

    public onCancelPressed(aPressed: boolean): void {
        LogUtil.info(this, 'onCancelPressed -> ' + JSON.stringify(aPressed));
    }


    private updateEntries(): void {
        this.entryService.getEntries().subscribe(
            (data: Entry[]) => {
                LogUtil.info(this, 'update entries');
                this.entries = data;
            },
            error => {
                LogUtil.info(this, 'error -> update entries');
                this.entries = [];
            }
        )
    }
}
