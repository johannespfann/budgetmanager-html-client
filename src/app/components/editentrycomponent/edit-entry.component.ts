import { Component, ViewChild, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { LogUtil } from '../../utils/log-util';
import { EntryInfoComponent } from '../entryinfocomponent/entry-info.component';
import { Entry } from '../../models/entry';
import { EntryInfo } from '../entryinfocomponent/entry-info';

@Component({
    selector: 'app-edit-entry',
    templateUrl: './edit-entry.component.html',
    styleUrls: ['./edit-entry.component.css']
})
export class EditEntryComponent implements OnChanges {

    @ViewChild(EntryInfoComponent)
    public entryComponent: EntryInfoComponent;

    public createEntryDate = new Date();

    constructor() {
        LogUtil.logInits(this, 'init edit-endry-component');
    }

    @Input()
    public entry: Entry;

    @Output()
    public cancelPressed = new EventEmitter<boolean>();

    @Output()
    public deletedPressed = new EventEmitter<Entry>();

    @Output()
    public changedPressed = new EventEmitter<Entry>();


    public ngOnChanges(changes: SimpleChanges): void {
        LogUtil.debug(this, 'onChanges -> edit-entry-component');
        this.initEntryView(this.entry);
    }

    public change(): void {
        this.changedPressed.emit(this.createNewEntry());
    }

    public delete(): void {
        this.deletedPressed.emit(this.entry);
    }

    public cancel(): void {
        this.cancelPressed.emit(true);
    }

    private initEntryView(aEntry: Entry): void {
        const entryInfo = new EntryInfo();

        entryInfo.amount = aEntry.amount;
        entryInfo.memo = aEntry.memo;
        entryInfo.tags = aEntry.tags;
        entryInfo.currency = 'EUR';
        this.createEntryDate = aEntry.created_at;
        this.entryComponent.initEntryView(entryInfo);
    }

    private createNewEntry(): Entry {
        const newEntry = new Entry();
        newEntry.hash = this.entry.hash;
        const entryInfo = this.entryComponent.getEntryInfo();
        newEntry.amount = entryInfo.amount;
        newEntry.currency = entryInfo.currency;
        newEntry.memo = entryInfo.memo;
        newEntry.tags = entryInfo.tags;
        newEntry.created_at = this.createEntryDate;
        return newEntry;
    }


}
