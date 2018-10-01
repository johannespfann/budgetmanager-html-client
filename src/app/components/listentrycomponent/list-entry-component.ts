import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Entry } from '../../models/entry';
import { LogUtil } from '../../utils/log-util';
import { EntryPackage } from '../../models/entry-package';
import { Packager } from '../../utils/packager';

@Component({
    selector: 'app-list-entry-component',
    templateUrl: './list-entry.component.html',
    styleUrls: ['./list-entry.component.css']
})
export class ListEntryComponent implements OnInit, OnChanges {

    /**
     * view attributes
     */

    public entryPackages: EntryPackage[] = [];

    /**
     * member
     */

    private entryPackager: Packager;

    @Input()
    public entries: Entry[];

    @Output()
    public editPressed = new EventEmitter<Entry>();

    constructor() {
        this.entryPackager = new Packager();
    }

    public ngOnInit(): void {
        LogUtil.info(this, 'onInit -> list-entry-component');
    }

    public ngOnChanges(aCanges: SimpleChanges): void {
        LogUtil.info(this, 'onChanges -> list-entry-component');
        this.initListView();
    }

    public editEntry(aEntry: Entry): void {
        LogUtil.info(this, 'pressed edit -> ' + JSON.stringify(aEntry));
        this.editPressed.emit(aEntry);
    }

    private initListView(): void {
        this.entryPackages = this.entryPackager.splitInMonth(this.entries);
    }


}
