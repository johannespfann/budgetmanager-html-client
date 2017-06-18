import { Component, Input } from "@angular/core";
import { CategoryService } from "../services/category.service";
import { Category } from "../models/category";


@Component({
    selector: 'delete-category-component',
    templateUrl: './delete-category.component.html'
})
export class DeleteCategoryComponent {

    @Input() category: Category;

    constructor(private categoryService: CategoryService){
        console.log("init DeleteCategoryComponent");
    }
}