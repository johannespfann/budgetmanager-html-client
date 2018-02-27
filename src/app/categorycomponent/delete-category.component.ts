import { Component, Input, OnInit } from "@angular/core";
import { CategoryService } from "../services/category.service";
import { Category } from "../models/category";
import { LogUtil } from "../utils/log-util";
import { MessagingService } from "../messages/message.service";
import { Subscription } from "rxjs";
import { CategoryDeletedMessage } from "../messages/category-deleted-message";


@Component({
    selector: 'delete-category-component',
    templateUrl: './delete-category.component.html'
})
export class DeleteCategoryComponent{

    @Input() category: Category;

    private defaultCategory: Category;

    private isDeletable: boolean;

    private categories: Array<Category>;

    private selectedCategory: Category;

    private categoryDeletedSubscription: Subscription;

    constructor(
            private categoryService: CategoryService,
            private messageService : MessagingService
        ){
        LogUtil.debug(this,'Init DeleteCategoryComponent');
    }

    public ngOnInit(){
        this.categoryService.getDefaultCategory().subscribe((data:Category) => {
            this.defaultCategory = data;
        });
        
        this.categoryService.getCategories().subscribe((categories: Array<Category>) => {
            this.categories = this.filterCurrentCategory(categories, this.category);
        })
    }

    public changed(aCategory: Category): void{
        this.selectedCategory = aCategory;
    }

    public deleteCategory(): void{      
        this.categoryService.delete(this.category, this.selectedCategory);
    }

    private filterCurrentCategory(aCategories: Array<Category>, aCategory: Category): Array<Category>{
        return aCategories.filter(category => category.hash != aCategory.hash);
    }


}