import { Component, EventEmitter, Output } from "@angular/core";
import { Category } from "../models/category";
import { CategoryService } from "../services/category.service";
import { MessagingService } from "../messages/message.service";
import { LogUtil } from "../utils/log-util";

@Component({
    selector: 'add-category-component',
    templateUrl: './add-category.component.html'
})
export class AddCategoryComponent {

    private name: string;

    constructor(
            private categoryService: CategoryService,
            private messageService: MessagingService) {
        LogUtil.debug(this,"Init AddCategoryComponent");
        this.name = "";
    }

    public save(): void {
 
        LogUtil.info(this,"Add new category! " +  this.name);
        
        if (this.name == null) {
            return;
        }
        
        let category: Category = Category.create(this.name);
        this.categoryService.addNewCategory(category);
        this.clearView();
    }

    private clearView(): void {
        this.name = "";
    }
}