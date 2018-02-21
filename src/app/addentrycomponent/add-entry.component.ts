import { Component, style } from "@angular/core";

import { Category } from "../models/category";
import { Tag } from "../models/tag";
import { Entry } from "../models/entry";
import { MathUtil } from "../utils/math-util";
import { CategoryService } from "../services/category.service";
import { EntryService } from "../services/entry.service";
import { LogUtil } from "../utils/log-util";


@Component({
    selector: 'newentry',
    templateUrl: './add-entry.component.html',
    styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent {

    algebraicSignIsMinus: boolean = true;

    private amount: number;
    private memo: string;
    private categories: Array<Category>;

    private 

    private category: Category;
    private tags: Array<Tag>;

    constructor(
            private categoryService: CategoryService,
            private entryService: EntryService){

        LogUtil.info(this,'Invoke AddEntryComponent');

        this.algebraicSignIsMinus = true;
        this.amount;
        this.memo = "";
        
        categoryService.getCategories().subscribe((categories: Array<Category>) => {
            this.categories = categories;
        });
        
        categoryService.getDefaultCategory().subscribe((data:Category) => {
            this.category = data;
        });

        LogUtil.info(this,'DefaultCategory: ' + JSON.stringify(this.category));
    }


    private save(): void {
        LogUtil.info(this,'press save');
        
        let amountValue: number;

        if(this.algebraicSignIsMinus){
            amountValue = MathUtil.convertToNegativ(this.amount);
        }
        else{
            amountValue = MathUtil.convertToPositiv(this.amount);
        }

        let entry:Entry = Entry.create(amountValue);

        entry.setMemo(this.memo);

        LogUtil.info(this,"Category: " + JSON.stringify(this.category));

        entry.setCategory(this.category);  

        this.entryService.addEntry(entry).subscribe(
            data => {
                LogUtil.info(this,'save : ' + JSON.stringify(entry));
                this.cleanAttributes();
            }
        );

        

    }

    private cleanAttributes(): void {
        this.amount = null;
        this.memo = null;

        this.categoryService.getDefaultCategory().subscribe((data:Category) => {
            this.category = data;
        });
        
        LogUtil.info(this,'Cleaned View');
    }

    private changeAlgebraicSignIsMinus(): void {
        if(this.algebraicSignIsMinus){
            this.algebraicSignIsMinus = false;
        }
        else{
            this.algebraicSignIsMinus = true;
        }
    }

    private changed(aCategory: Category){
        LogUtil.info(this,'Changed: ' + JSON.stringify(aCategory));
    }

    

}