import { Component } from "@angular/core";
import { Category } from "../models/category";

@Component({
    selector: 'add-category-component',
    templateUrl: './add-category.component.html'
})
export class AddCategoryComponent{

    private name:string;

    constructor(private categoryService:Category){
        this.name = "";
    }

        private save(): void {
        this.categoryService.addNewCategory(this.name);
        console.log("Add new category with name: " + this.name);
        this.categories = this.categoryService.getCategories();
    }
}