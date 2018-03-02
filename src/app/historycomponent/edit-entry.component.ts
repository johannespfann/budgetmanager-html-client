import { Component, Input } from "@angular/core";
import { Entry } from "../models/entry";
import { EntryService } from "../services/entry.service";
import { LogUtil } from "../utils/log-util";
import { Tag } from "../models/tag";
import { Category } from "../models/category";
import { CategoryService } from "../services/category.service";

@Component({
    selector: 'edit-entry-component',
    templateUrl: './edit-entry.component.html',
    styleUrls: ['./edit-entry.component.css']
})
export class EditEntryComponent {

    @Input() entry: Entry;

    private categoriesStrings: Array<string>;
    private selectedCategoryName: string;

    private categories: Array<Category>;
    private selectedCategory: Category;


    private currentTag: string; 

    
    private amount: number;
    private memo: string;
    private category: Category;
    private tags: Array<Tag>;
    private hash: string;

    private editEntry: Entry;

    constructor(
        private entryService: EntryService,
        private categoryservice: CategoryService) {
            LogUtil.debug(this,'Init EditEntryComponent');

        categoryservice.getCategories().subscribe( (categories: Array<Category>) => {
            this.categories = categories;

            this.categoriesStrings = new Array<string>();
            this.categories.forEach( (category: Category) => {
                this.categoriesStrings.push(category.name);
            });
            
        });
    }

    private changed(){
        LogUtil.info(this,"Selected " + this.selectedCategoryName);
        this.selectedCategory = this.categories.find((category: Category) => category.name == this.selectedCategoryName);
        LogUtil.info(this, this.selectedCategory.name);
        
    }

    private update(){
        LogUtil.info(this,'Pressed updateCategory');

        this.editEntry.amount = this.amount;
        this.editEntry.memo = this.memo;
        this.editEntry.category = this.selectedCategory;
        this.editEntry.tags = this.tags;

        this.entryService.update(this.editEntry).subscribe();

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

    private deleteTag(aTag: Tag): void {
        this.tags = this.tags.filter(tag => aTag != tag);
        LogUtil.info(this,"clicked deleteTag " + aTag.name);
    }

    private ngOnInit(){
        LogUtil.debug(this,"OnInit of EditCategoryComponent"); 
        LogUtil.debug(this,JSON.stringify(this.entry)); 
        this.editEntry = Entry.copy(this.entry);
        this.amount = this.editEntry.amount;
        this.memo = this.editEntry.memo;
        this.category = this.editEntry.category;
        this.tags = this.editEntry.tags;
        this.hash = this.editEntry.hash;
        this.selectedCategoryName = this.editEntry.category.name;
        this.selectedCategory = this.editEntry.category;

    }



}