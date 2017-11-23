import { Component, Input, OnInit } from "@angular/core";
import { CategoryService } from "../services/category.service";
import { Category } from "../models/category";
import { LogUtil } from "../utils/log-util";
import { MessagingService } from "../services/message.service";
import { Subscription } from "rxjs";
import { CategoryDeletedMessage } from "../services/category-deleted-message";


@Component({
    selector: 'delete-category-component',
    templateUrl: './delete-category.component.html'
})
export class DeleteCategoryComponent implements OnInit {

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
        LogUtil.debug(this,"OnInit of DeleteCategoryComponent"); 
        LogUtil.debug(this,JSON.stringify(this.category));  

        this.defaultCategory = this.categoryService.getDefaultCategory();
        this.categories = this.filterCurrentCategory(this.categoryService.getCategories(),this.category);
    }

    public changed(aCategory: Category): void{
        LogUtil.info(this,'Selected: ' + aCategory.getName());
        this.selectedCategory = aCategory;
    }

    public deleteCategory(): void{
        LogUtil.info(this,'Pressed delete category');
        LogUtil.info(this,' - Delete : ' + this.category.getName());
        LogUtil.info(this,' - Replace: ' + this.selectedCategory.getName());
        
        this.categoryService.delete(this.category, this.selectedCategory);
    }

    private filterCurrentCategory(aCategories: Array<Category>, aCategory: Category): Array<Category>{
        return aCategories.filter(category => category.getId() != aCategory.getId());
    }




}