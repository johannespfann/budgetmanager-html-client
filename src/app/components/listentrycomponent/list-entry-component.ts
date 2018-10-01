import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Entry } from '../../models/entry';
import { LogUtil } from '../../utils/log-util';
import { EntryPackage } from '../../models/entry-package';
import { Packager } from '../../utils/packager';

@Component({
    selector: 'app-list-entry',
    templateUrl: './list-entry-component.html',
    styleUrls: ['./list-entry-component.css']
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
        LogUtil.debug(this, 'onInit');
    }

    public ngOnChanges(aCanges: SimpleChanges): void {
        LogUtil.debug(this, 'onChanges');
        this.initListView();
    }

    public editEntry(aEntry: Entry): void {
        LogUtil.info(this, 'pressed edit');
        this.editPressed.emit(aEntry);
    }

    private initListView(): void {
        this.entryPackages = this.entryPackager.splitInMonth(this.entries);
    }


}
