import { Component } from "@angular/core";
import { EntryService } from "../services/entry.service";
import { CategoryService } from "../services/category.service";
import { Entry } from "../models/entry";
import { LogUtil } from "../utils/log-util";

@Component({
    selector : 'history-component',
    templateUrl : './history.component.html'
})
export class HistoryComponent{

    private entries: Entry[];

    constructor(
        private entryService: EntryService,
    ){
        entryService.getEntries().subscribe(
            (data: Array<Entry>) => {
                this.entries = this.sortByTime(data);
            }
        )
    }

    private deleteEntry(aEntry:Entry): void {
        LogUtil.info(this,'delete entry: ' + JSON.stringify(aEntry));
        this.entryService.deleteEntry(aEntry).subscribe(
            data => this.updateEntries()
        );
        
    }

    private updateEntries(): void {
        this.entryService.getEntries().subscribe(
            (data: Array<Entry>) => {
                this.entries = this.sortByTime(data);
            }
        )
    }

    private sortByTime(aEntries: Entry[]): Entry[] {
        return aEntries.sort(function(a:Entry, b:Entry){
            return b.created_at.getTime() - a.created_at.getTime();
        });

    }
}