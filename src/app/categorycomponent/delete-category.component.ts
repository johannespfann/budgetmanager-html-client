import { Component, Input } from "@angular/core";
import { CategoryService } from "../services/category.service";
import { Category } from "../models/category";
import { LogUtil } from "../utils/log-util";


@Component({
    selector: 'delete-category-component',
    templateUrl: './delete-category.component.html'
})
export class DeleteCategoryComponent {

    @Input() category: Category;

    constructor(private categoryService: CategoryService){
        LogUtil.debug('Init DeleteCategoryComponent');
        LogUtil.debug(this.category.getName());
    }


}