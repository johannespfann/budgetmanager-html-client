import { Component, Input, AfterViewInit, AfterViewChecked, OnInit, EventEmitter, Output } from "@angular/core";
import { LogUtil } from "../utils/log-util";
import { RotationEntry } from "../models/rotationentry";
import { Category } from "../models/category";
import { Tag } from "../models/tag";
import { RotationUtil } from "./rotationutil";
import { TagService } from "../services/tag.service";
import { CategoryService } from "../services/category.service";
import { RotationEntryService } from "../services/rotation-entry.service";


@Component({
    selector: 'rotation-entry-edit',
    templateUrl: './rotation-entry-edit.component.html'
})
export class RotationEntryEditComponent implements  OnInit{

    @Input()
    public rotationEntry: RotationEntry;

    @Output()
    public updatedDone = new EventEmitter<boolean>();

    private amount: number;
    private memo: string;
    private categories: Category[];

    private category: Category;

    private selectedCategory: Category;
    private selectedCategoryName: string;

    private tags: Tag[];

    private possibleTags: Tag[];

    private currentTag: string;

    private startRotationDate: Date; 

    private hash: string;

    private rotation_strategy: string;

    private end_at: Date;

    private last_executed: Date;

    private categoriesStrings: Array<string>;

    constructor(
        private rotationEntryService: RotationEntryService,
        private tagService: TagService,
        private categoryservice: CategoryService,
    ){
        LogUtil.info(this,'Init RotationEntryEditComponent');
        
        categoryservice.getCategories().subscribe( (categories: Array<Category>) => {
            this.categories = categories;
            this.categoriesStrings = new Array<string>();
            
            this.categories.forEach( (category: Category) => {
                this.categoriesStrings.push(category.name);
                
            });
        });

        tagService.getTags().subscribe( (tags: Array<Tag>) => {
            this.possibleTags = tags 
        });
    }

    public ngOnInit(): void {
        this.initView();
    }

    private changed(){
        this.selectedCategory = this.categories.find((category: Category) => category.name == this.selectedCategoryName);
    }

    public save(){
        let rotationEntry = new RotationEntry();
        rotationEntry.amount = this.amount;
        rotationEntry.category = this.selectedCategory;
        rotationEntry.end_at = this.end_at;
        rotationEntry.hash = this.hash;
        rotationEntry.last_executed = this.last_executed;
        rotationEntry.memo = this.memo;
        rotationEntry.rotation_strategy = this.rotation_strategy;
        rotationEntry.start_at = this.startRotationDate;
        rotationEntry.tags = RotationUtil.convertToString(this.tags);

        this.rotationEntryService.updateRotationEntry(rotationEntry).subscribe(
            data => {
                LogUtil.info(this, 'Saved: ' + JSON.stringify(rotationEntry));
                LogUtil.info(this,'invoke closeDone');
                this.updatedDone.emit(false);
            }
        )
    }

    private initView(): void {
        this.hash = this.rotationEntry.hash;
        this.amount = this.rotationEntry.amount;
        this.memo = this.rotationEntry.memo;
        this.end_at = this.rotationEntry.end_at;
        this.selectedCategory = this.rotationEntry.category;
        this.selectedCategoryName = this.rotationEntry.category.name
        this.tags = RotationUtil.convertToTagArray(this.rotationEntry.tags);
        this.startRotationDate = this.rotationEntry.start_at;
        this.rotation_strategy = this.rotationEntry.rotation_strategy;
    }


}