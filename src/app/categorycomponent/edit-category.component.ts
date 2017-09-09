import { Component, Input } from "@angular/core";
import { Category } from "../models/category";
import { CategoryService } from "../services/category.service";
import { LogUtil } from "../utils/log-util";
import { MessagingService } from "../services/message.service";
import { CategoryUpdatedMessage } from "../services/category-updated-message";

@Component({
    selector: 'edit-category-component',
    templateUrl: './edit-category.component.html'
})
export class EditCategoryComponent {

    @Input() category: Category;

    private updatedCategory: Category;

    private name:string;

    constructor(
            private categoryService: CategoryService,
            private messageService: MessagingService){
        LogUtil.debug(this,'Init EditCategoryComponent');
    }

    private update(aCategory: Category){
        LogUtil.info(this,'Pressed updateCategory');

        this.categoryService.update(aCategory);
        this.messageService.publish(new CategoryUpdatedMessage(aCategory));
    }

    private ngOnInit(){
        LogUtil.debug(this,"OnInit of EditCategoryComponent"); 
        LogUtil.debug(this,JSON.stringify(this.category));  
        this.updatedCategory = Category.copy(this.category);
    }

}