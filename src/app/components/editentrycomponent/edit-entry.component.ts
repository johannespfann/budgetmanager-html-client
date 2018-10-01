import { Component, ViewChild, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { LogUtil } from '../../utils/log-util';
import { EntryInfoComponent } from '../entryinfocomponent/entry-info.component';
import { Entry } from '../../models/entry';

@Component({
    selector: 'app-edit-entry',
    templateUrl: './edit-entry.component.html',
    styleUrls: ['./edit-entry.component.css']
})
export class EditEntryComponent implements OnInit, OnChanges{

    @ViewChild(EntryInfoComponent) entryComponent: EntryInfoComponent;

    constructor() {
        LogUtil.info(this, 'init edit-endry-component');
    }

    @Input()
    public standingorder: Entry;

    @Output()
    public cancelPressed = new EventEmitter<boolean>();

    @Output()
    public deletedPressed = new EventEmitter<Entry>();

    @Output()
    public changedPressed = new EventEmitter<Entry>();

    public ngOnInit(): void {
        LogUtil.info(this, 'onInit -> edit-entry-component');
    }

    public ngOnChanges(changes: SimpleChanges): void {
        LogUtil.info(this, 'onChanges -> edit-entry-component');
    }

    public change(): void {
        LogUtil.info(this, 'pressed change');
        //this.changedPressed.emit();
    }

    public delete(): void {
        LogUtil.info(this, 'pressed delete');
        //this.deletedPressed.emit();
    }

    public cancel(): void {
        LogUtil.info(this, 'pressed cancel');
        //this.cancelPressed.emit(true);
    }

    private initEntryView(aEntry: Entry): void {

    }

    private createNewEntry(): Entry {
        return null;
    }


}
