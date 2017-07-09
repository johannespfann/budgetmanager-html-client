import { Injectable } from "@angular/core";
import { Entry } from "../models/entry";
import { CategoryService } from "./category.service";
import { LogUtil } from "../utils/log-util";

@Injectable()
export class EntryService{

    private entries: Array<Entry>;

    // TODO Delete CategoryService after testing
    constructor(private categoryService: CategoryService){
        LogUtil.debug("Init EntryService");
        this.entries = this.initTestData();
    }

    public getEntries(): Array<Entry>{
        return this.entries;
    }

    public addEntry(aEntry:Entry): void{
        this.entries.push(aEntry);  
    }

    public deleteEntry(aEntry:Entry){
        this.entries = this.deleteElementByIndex(
            this.entries,this.findIndexOfElement(this.entries,aEntry));
    }

    private findIndexOfElement(aEntries:Entry[], aEntry:Entry): number{
        let index = -1;
        index = aEntries.indexOf(aEntry);
        if(index === -1){
            throw new Error("could not find element: " + JSON.stringify(aEntry));
        }
        return index;      
    }

    private deleteElementByIndex(aEntries:Entry[], aIndex:number): Entry[]{
        let removedElements = aEntries.splice(aIndex,1);
        return aEntries;
    }

    // TODO Delete method after testing!
    private initTestData(): Array<Entry>{
        let categories = this.categoryService.getCategories();

        let memoText: string = "Eine Notiz mit viel Inhalt." 
                + " Viel Inhalt deswegen, weil es auch viel zu erzählen gibt.";


        let entry1 = new Entry(-200);
        entry1 = entry1.setId(1);
        entry1 = entry1.setCurrentDateNow();
        entry1 = entry1.setCategory(categories[1]);        
        entry1 = entry1.setMemo(memoText);
        
        let entry2 = new Entry(200);
        entry2 = entry2.setId(2);
        entry2 = entry2.setCurrentDateNow();
        entry2 = entry2.setCategory(categories[2]);
        entry2 = entry2.setMemo(memoText);

        let entry3 = new Entry(-5.50);
        entry3 = entry3.setId(3);
        entry3 = entry3.setCurrentDateNow();
        entry3 = entry3.setCategory(categories[0]);
        entry3 = entry3.setMemo(memoText);


        let entries = new Array<Entry>();
        entries.push(entry3);
        entries.push(entry2);
        entries.push(entry1);

        return entries;
    }
}