import { Component, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { EntryService } from '../../services/entry.service';
import { Entry } from '../../models/entry';
import { LogUtil } from '../../utils/log-util';
import { MessagingService } from '../../messages/message.service';
import { EntryUpdatedMessage } from '../../messages/entry-updated-message';
import { EntryPackage } from '../../models/entry-package';
import { Packager } from '../../utils/packager';

@Component({
    selector : 'app-history-component',
    templateUrl : './history.component.html'
})
export class HistoryComponent {

    private viewContainerRef;

    public entries: Entry[];

    public entryPackages: EntryPackage[] = [];

    constructor(
        private messageService: MessagingService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private entryService: EntryService,
    ) {
        entryService.getEntries().subscribe(
            (data: Entry[]) => {
                this.entries = this.sortByTime(data);
                const entryPackager = new Packager();
                this.entryPackages = entryPackager.splitInMonth(this.entries);
            },
            error => {
                LogUtil.info(this, 'Error was cached! -> ' + error);
                this.entries = new Array<Entry>();
            }
        );

        messageService.of(EntryUpdatedMessage).subscribe( (message: EntryUpdatedMessage) => {
            this.updateEntries();
            this.clearEntryEditComponent();
        } );
    }

    private deleteEntry(aEntry: Entry): void {
        LogUtil.info(this, 'delete entry: ' + JSON.stringify(aEntry));
        this.entryService.deleteEntry(aEntry).subscribe(
            data => {this.updateEntries(); },
            error => {LogUtil.info(this, 'Error was cacked! -> ' + error); }
        );

    }

    private updateEntries(): void {
        this.entryService.getEntries().subscribe(
            (data: Array<Entry>) => {
                this.entries = this.sortByTime(data);
                const entryPackager = new Packager();
                this.entryPackages = entryPackager.splitInMonth(this.entries);
            },
            error => {
                LogUtil.info(this, 'Error was cached! -> ' + error);
                this.entries = new Array<Entry>();
            }
        );
    }

    private sortByTime(aEntries: Entry[]): Entry[] {
        return aEntries.sort(function(a: Entry, b: Entry){
            return b.created_at.getTime() - a.created_at.getTime();
    });

    }

    public clearEntryEditComponent() {
        if (this.viewContainerRef) {
            this.viewContainerRef.clear();
        }
    }
}
