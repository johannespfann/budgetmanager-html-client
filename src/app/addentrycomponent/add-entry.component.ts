import { Component, style } from "@angular/core";

import { Category } from "../models/category";
import { Tag } from "../models/tag";
import { Entry } from "../models/entry";
import { MathUtil } from "../utils/math-util";
import { CategoryService } from "../services/category.service";
import { EntryService } from "../services/entry.service";
import { LogUtil } from "../utils/log-util";
import { TagService } from "../services/tag.service";


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

    private category: Category;
    private tags: Array<Tag>;

    private possibleTags: Array<Tag>;

    private currentTag: string;

    constructor(
            private tagService: TagService,
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

        tagService.getTags().subscribe( (tags: Array<Tag>) => {
            this.possibleTags = tags 
        });

        this.tags = new Array<Tag>();
        
    }

    private deleteTag(aTag: Tag): void {
        this.tags = this.tags.filter(tag => aTag != tag);
        LogUtil.info(this,"clicked deleteTag " + aTag.name);
    }

    private saveTag(event: any): void{
        
        if(this.currentTag.includes(" ")){

            let temp: Array<string> = this.currentTag.split(" ");
            let preparedTagName: string = temp[0];

            preparedTagName = preparedTagName.replace(" ","");
            if(preparedTagName == ""){

                this.currentTag = "";
                return;
            }

            let tag: Tag = new Tag();
            tag.name = preparedTagName;

            this.tags.push(tag);

            this.currentTag = "";

            LogUtil.info(this, "Add new Tag: size of tags: " + this.tags.length);

        }
        
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

        entry.category = this.category;  

        entry.tags = this.tags;

        LogUtil.info(this, "Add new Entry: size of tags: " + entry.tags.length);
        LogUtil.info(this,  JSON.stringify(entry));
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
        this.tags = new Array<Tag>();

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