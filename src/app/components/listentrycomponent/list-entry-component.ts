import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Entry } from '../../models/entry';
import { LogUtil } from '../../utils/log-util';
import { EntryPackage } from '../../models/entry-package';
import { Packager } from '../../utils/packager';
import { SortUtil } from '../../utils/sort-util';

@Component({
    selector: 'app-list-entry',
    templateUrl: './list-entry-component.html',
    styleUrls: ['./list-entry-component.css']
})
export class ListEntryComponent implements OnChanges {

    public entryPackages: EntryPackage[] = [];

    private entryPackager: Packager;

    @Input()
    public entries: Entry[];

    @Output()
    public editPressed = new EventEmitter<Entry>();

    constructor() {
        LogUtil.debug(this, 'init list-entry-component');
        this.entryPackager = new Packager();
    }

    public ngOnChanges(aCanges: SimpleChanges): void {
        LogUtil.debug(this, 'onChanges');
        this.initListView();
    }

    public editEntry(aEntry: Entry): void {
        this.editPressed.emit(aEntry);
    }

    private initListView(): void {
        this.entryPackages = this.entryPackager.splitInMonth(SortUtil.sortEntriesByTimeDESC(this.entries));
    }
}
