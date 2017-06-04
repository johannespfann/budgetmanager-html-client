import { Injectable } from "@angular/core";
import { Entry } from "../models/entry";
import { CategoryService } from "./category.service";

@Injectable()
export class EntryService{

    private entries: Array<Entry>;

    // TODO Delete CategoryService after testing
    constructor(private categoryService: CategoryService){
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
        let categories = this.categoryService.getCategories();

        let entry1 = new Entry();
        entry1.id = 1;
        entry1.amount = -200;
        entry1.current_date = Date.now();
        entry1.category = categories[1];
        entry1.memo = "Eine Notiz mit viel Inhalt. Viel Inhalt deswegen, weil es auch viel zu erzählen gibt.";

        let entry2 = new Entry();
        entry2.id = 1;
        entry2.amount = +200;
        entry2.current_date = Date.now();
        entry2.category = categories[2];
        entry2.memo = "Eine Notiz mit viel Inhalt. Viel Inhalt deswegen, weil es auch viel zu erzählen gibt.";
        
        let entry3 = new Entry();
        entry3.id = 1;
        entry3.amount = -5.50;
        entry3.current_date = Date.now();
        entry3.category = categories[0];
        entry3.memo = "Eine Notiz mit viel Inhalt. Viel Inhalt deswegen, weil es auch viel zu erzählen gibt.";

        let entries = new Array<Entry>();
        entries.push(entry3.copy());
        entries.push(entry2.copy());
        entries.push(entry1.copy());

        return entries;
    }
}