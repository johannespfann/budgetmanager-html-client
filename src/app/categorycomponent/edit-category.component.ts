import { Component, Input } from "@angular/core";
import { Category } from "../models/category";
import { CategoryService } from "../services/category.service";

@Component({
    selector: 'edit-category-component',
    templateUrl: './edit-category.component.html'
})
export class EditCategoryComponent{

    @Input() category: Category;

    private name:string;

    constructor(
            private categoryService: CategoryService){
        this.name = "";
    }

    public update(aCategory:Category): void {
        this.categoryService.update(aCategory);
    }


}