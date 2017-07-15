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
        this.entries = this.sortByTime(entryService.getEntries());
    }

    private sortByTime(aEntries: Entry[]): Entry[] {
        return aEntries.sort(function(a,b){
            return b.getCreationDate() - a.getCreationDate();
        });
    }

    private deleteEntry(aEntry:Entry): void {
        LogUtil.info(this,'delete entry: ' + JSON.stringify(aEntry));
        this.entryService.deleteEntry(aEntry);
        this.updateEntries();
    }

    private updateEntries(): void {
        LogUtil.info(this,'update entries')
        this.entries = this.entryService.getEntries();
    }
}