import { Injectable } from "@angular/core";
import { Entry } from "../models/entry";
import { CategoryService } from "./category.service";
import { LogUtil } from "../utils/log-util";
import { Category } from "../models/category";
import { Subscription } from "rxjs";
import { MessagingService } from "./message.service";
import { CategoryUpdatedMessage } from "./category-updated-message";


@Injectable()
export class EntryService{

    private entries: Array<Entry>;

    private categoryUpdatedSubscription: Subscription;

    // TODO Delete CategoryService after testing
    constructor(
            private categoryService: CategoryService,
            private messageService: MessagingService){
        LogUtil.debug(this,"Init EntryService");
        this.entries = this.initTestData();

        this.categoryUpdatedSubscription = messageService
            .of(CategoryUpdatedMessage)
            .subscribe((data: CategoryUpdatedMessage) => {
                this.updateCategories(Category.copy(data.getCategory()));
            });
    }

    private updateCategories(aCategory: Category): void{
        LogUtil.info(this,'updatedCategories has these entries: ' + aCategory.getName());

        for(let entry of this.entries){
            console.log(entry.getId() + ' : ' + entry.getCategory().getName());
        }

        for(let entry of this.entries){
            if(entry.getCategory().getId() == aCategory.getId()){
                entry.setCategory(aCategory);


            }
        }

        for(let entry of this.entries){
            console.log(entry.getId() + ' : ' + entry.getCategory().getName());
        }


    }

    public getEntries(): Array<Entry>{
        let newEntries: Array<Entry> = new Array<Entry>();

        for(let entry of this.entries){
            newEntries.push(Entry.copy(entry));
        }

        return newEntries;
    }

    public addEntry(aEntry:Entry): void{
        this.entries.push(aEntry);  
    }

    public deleteEntry(aEntry:Entry){
        this.entries = this.deleteElementByIndex(
            this.entries,this.findIndexOfElementById(aEntry));
    }

    private findIndexOfElementById(aEntry: Entry): number{
        for(var index in this.entries){
            if(aEntry.getId() == this.entries[index].getId()){
                LogUtil.info(this, "Index" + index);
                return Number(index);
            }
        }
        throw new Error("could not find element: " + JSON.stringify(aEntry));
    }

    private deleteElementByIndex(aEntries:Entry[], aIndex:number): Entry[]{
        let removedElements = aEntries.splice(aIndex,1);
        LogUtil.debug(this,'Remove elements: ' + JSON.stringify(removedElements));
        return aEntries;
    }

    private update(aEntry: Entry){
        let index:number = this.findIndexOfElementById(aEntry);
        this.entries[index] = aEntry;
    }


    // TODO Delete method after testing!
    private initTestData(): Array<Entry>{
        let categories = this.categoryService.getCategories();

        let memoText: string = "Eine Notiz mit viel Inhalt." 
                + " Viel Inhalt deswegen, weil es auch viel zu erzählen gibt.";


        let entry1 = Entry.create(-200);
        entry1.setCurrentDateNow();
        entry1.setCategory(categories[1]);        
        entry1.setMemo(memoText);
        
        let entry2 = Entry.create(200);
        entry2.setCurrentDateNow();
        entry2.setCategory(categories[2]);
        entry2.setMemo(memoText);

        let entry3 = Entry.create(-5.50);
        entry3.setCurrentDateNow();
        entry3.setCategory(categories[0]);
        entry3.setMemo(memoText);

        let entries = new Array<Entry>();
        entries.push(entry3);
        entries.push(entry2);
        entries.push(entry1);

        return entries;
    }
}