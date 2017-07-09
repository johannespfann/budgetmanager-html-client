import { Component, EventEmitter, Output } from "@angular/core";
import { Category } from "../models/category";
import { CategoryService } from "../services/category.service";
import { MessagingService } from "../services/message.service";
import { CategoryUpdatedMessage } from "../services/category-updated-message";
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
        LogUtil.debug("Init AddCategoryComponent");
        this.name = "";
    }

    public save(): void {

        console.log("Add new category!");
        if (this.name != null) {
            return;
        }
        let category: Category = new Category(this.name);
        this.categoryService.addNewCategory(category);
        this.messageService.publish(new CategoryUpdatedMessage(category));

        this.clearView();
    }

    private clearView(): void {
        this.name = "";
    }


}