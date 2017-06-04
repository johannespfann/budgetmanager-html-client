import { Injectable } from "@angular/core";
import { Entry } from "../models/entry";

@Injectable()
export class EntryService{

    entries: Array<Entry>;

    constructor(){
        console.log("Init EntryService");
        this.entries = this.initTestData();
    }

    public getEntries(): Array<Entry>{
        return this.entries;
    }

    public addEntry(aEntry:Entry): void{
        this.entries.push(aEntry.copy());  
    }

    public deleteEntry(aEntry:Entry){
        // TODO
    }

    public initTestData(): Array<Entry>{

        let entries = new Array<Entry>();

        return entries;
    }
}