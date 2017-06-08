import { Component } from "@angular/core";
import { CategoryService } from "../services/category.service";


@Component({
    selector: 'delete-category-component',
    templateUrl: './delete-category.component.html'
})
export class DeleteCategoryComponent {
    constructor(private categoryService: CategoryService){
        console.log("init DeleteCategoryComponent");
    }
}