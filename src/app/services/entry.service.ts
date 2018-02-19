import { Injectable } from "@angular/core";
import { Entry } from "../models/entry";
import { CategoryService } from "./category.service";
import { LogUtil } from "../utils/log-util";
import { Category } from "../models/category";
import { Subscription } from "rxjs";
import { MessagingService } from "./message.service";
import { CategoryUpdatedMessage } from "./category-updated-message";
import { CategoryDeletedMessage } from "./category-deleted-message";
import { EntriesModifiedMessage } from "./entries-modified-message";
import { Observable } from "rxjs/Observable";
import { EntryAPIService } from "./entry.api.service";
import { ApplicationService } from "../application/application.service";


@Injectable()
export class EntryService{

    private entries: Array<Entry>;

    private categoryUpdatedSubscription: Subscription;

    private categoryDeletedSubscription: Subscription;

    constructor(
            private entryApiService: EntryAPIService,
            private categoryService: CategoryService,
            private messageService: MessagingService,
            private appService: ApplicationService){
        LogUtil.debug(this,"Init EntryService");

        this.categoryUpdatedSubscription = messageService
            .of(CategoryUpdatedMessage)
            .subscribe((data: CategoryUpdatedMessage) => {
                this.updateCategory(Category.copy(data.getCategory()));
            });

        this.categoryDeletedSubscription = messageService
            .of(CategoryDeletedMessage)
            .subscribe((data: CategoryDeletedMessage) => {
                this.replaceCategory(data.getCategory(),data.getFallBackCategory());
            });
    }

    private replaceCategory(aFromCategory: Category, aToCategory: Category){
        this.entries.filter(entry => {
           if(entry.getCategory().hash == aFromCategory.hash){
               entry.setCategory(aToCategory);
           } 
        });

        this.messageService.publish(new EntriesModifiedMessage());
    }

    private updateCategory(aCategory: Category): void{
        this.entries.filter(entry => {
            if(entry.getCategory().hash == aCategory.hash){
                entry.setCategory(aCategory);
            }
        });
    }

    public getEntries(): Observable<Array<Entry>{

        //return this.entryApiService.getEntries(this.appService.getCurrentUser())
        return new Observable<Array<Entry>>();
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

}