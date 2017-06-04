import { Component } from "@angular/core";
import { EntryService } from "../services/entry.service";
import { CategoryService } from "../services/category.service";
import { Entry } from "../models/entry";

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
        console.log('Entries: ' + this.entries.length);
    }

    private sortByTime(aEntries: Entry[]): Entry[] {
        return aEntries.sort(function(a,b){
            console.log('Compare: ' + a.current_date + ' and ' + b.current_date);
            return b.current_date - a.current_date;
        });
    }

/*
    ngOnChanges(){
        console.log("ngOnChanges");
    }

    ngOnInit(){
        console.log("ngOnInit");
    }

    ngDoCheck(){
        console.log("ngDoCheck");
    }

    ngAfterContentInit(){
        console.log("ngAfterContentInit");
    }

    ngAfterContentChecked(){
        console.log("ngAfterContentChecked");
    }

    ngAfterViewInit(){
        console.log("ngAfterViewInit");
    }

    ngAfterViewChecked(){
        console.log("ngAfterViewChecked");
    }

    ngOnDestroy(){
        console.log("ngOnDestroy");
    }
*/
}