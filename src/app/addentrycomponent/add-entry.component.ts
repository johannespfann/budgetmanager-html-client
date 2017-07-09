import { Component } from "@angular/core";

import { Category } from "../models/category";
import { Tag } from "../models/tag";
import { Entry } from "../models/entry";
import { MathUtil } from "../utils/math-util";
import { CategoryService } from "../services/category.service";
import { EntryService } from "../services/entry.service";

const CATEGORIES: string[] = ['Allgemein','Haushalt','Einnahmen'];

@Component({
    selector: 'newentry',
    templateUrl: './add-entry.component.html'
})
export class AddEntryComponent {

    algebraicSignIsMinus: boolean = true;

    private amount: number;
    private memo: string;
    private categories: Array<Category>;
    private category: Category;
    private tags: Array<Tag>;

    constructor(
            private categoryService: CategoryService,
            private entryService: EntryService){

        console.log('Invoke AddEntryComponent');

        this.algebraicSignIsMinus = true;
        this.amount;
        this.memo = "";
        this.categories = categoryService.getCategories();
        this.category = categoryService.getDefaultCategory();
    }


    private save(): void {
        console.log("press save");
        
        let amountValue: number;

        if(this.algebraicSignIsMinus){
            amountValue = MathUtil.convertToNegativ(this.amount);
        }
        else{
            amountValue = MathUtil.convertToPositiv(this.amount);
        }

        let entry:Entry = new Entry(amountValue);

        entry = entry.setMemo(this.memo);
        entry = entry.setCategory(this.category);  
        entry = entry.setCurrentDateNow();

        this.entryService.addEntry(entry);

        console.log('save : ' + JSON.stringify(entry));

        this.cleanAttributes();

    }

    private cleanAttributes(): void {
        this.amount = null;
        this.memo = null;
        this.category = this.categoryService.getDefaultCategory();
        console.log("Cleaned View");
    }

    private changeAlgebraicSignIsMinus(): void {
        if(this.algebraicSignIsMinus){
            this.algebraicSignIsMinus = false;
        }
        else{
            this.algebraicSignIsMinus = true;
        }
    }

}