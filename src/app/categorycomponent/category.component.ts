
import { Component } from "@angular/core";
import { CategoryService } from "../services/category.service";
import { Category } from "../models/category";

@Component({
    selector : 'category-component',
    templateUrl : './category.component.html'
})
export class CategoryComponent{

    private name: string;

    private categories: Category[];
    
    constructor(private categoryService:CategoryService){
        this.categories = categoryService.getCategories();  
        this.name = "";    
    }

    private save(): void {
        this.categoryService.addNewCategory(this.name);
        console.log("Add new category with name: " + this.name);
        this.categories = this.categoryService.getCategories();
    }


    private deleteCategory(aCategory:Category): void {
        console.log("delete Category");
    }



}