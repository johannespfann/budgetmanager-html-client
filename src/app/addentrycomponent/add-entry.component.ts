import { Component } from "@angular/core";

import { Category } from "../models/category";
import { Tag } from "../models/tag";
import { Entry } from "../models/entry";
import { MathUtil } from "../utils/math-util";
import { CategoryService } from "../services/category.service";

const CATEGORIES: string[] = ['Allgemein','Haushalt','Einnahmen'];

@Component({
    selector: 'newentry',
    templateUrl: './add-entry.component.html'
})
export class AddEntryComponent {

    algebraicSignIsMinus: boolean = true;

    amount: number = 0;

    memo: string = "";

    categories: Array<Category>;

    category: Category;

    tags: Array<Tag>;

    constructor(private categoryService: CategoryService){
        console.log('Invoke AddEntryComponent');

        this.algebraicSignIsMinus = true;
        this.amount = 0
        this.memo = "";
        this.categories = categoryService.getCategories();
        this.category = categoryService.getDefaultCategory();
    }


    private save(): void {
        console.log("press save");
        let entry:Entry = new Entry();

        if(this.algebraicSignIsMinus){
            entry.amount = MathUtil.convertToNegativ(this.amount);
        }
        else{
            entry.amount = MathUtil.convertToPositiv(this.amount);
        }

        entry.memo = this.memo;
        entry.current_date = Date.now();
        entry.category = this.category;  
        entry.tags = this.tags;

        // TODO Save Entry

        console.log('save : ' + JSON.stringify(entry));

        this.cleanAttributes();

    }

    private cleanAttributes(): void {
        this.amount = 0;
        this.memo = "";
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

    private findCategoryObject(value:string){
        // Get all Categories

    }

}