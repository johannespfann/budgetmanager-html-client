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
        LogUtil.debug(this,"OnInit of DeleteCategoryComponent"); 
        LogUtil.debug(this,JSON.stringify(this.category));  

        this.categoryService.getDefaultCategory().subscribe((data:Category) => {
            this.defaultCategory = data;
        });
        
        //this.categories = this.filterCurrentCategory(this.categories,this.category);

        this.categoryService.getCategories().subscribe((categories: Array<Category>) => {
            this.categories = this.filterCurrentCategory(categories, this.category);
        })
    }




    public changed(aCategory: Category): void{
        LogUtil.info(this,'Selected: ' + aCategory.name);
        this.selectedCategory = aCategory;
    }

    public deleteCategory(): void{
        LogUtil.info(this,'Pressed delete category');
        LogUtil.info(this,' - Delete : ' + this.category.name);
        LogUtil.info(this,' - Replace: ' + this.selectedCategory.name);
        
        this.categoryService.delete(this.category, this.selectedCategory);
    }

    private filterCurrentCategory(aCategories: Array<Category>, aCategory: Category): Array<Category>{
        return aCategories.filter(category => category.hash != aCategory.hash);
    }


}