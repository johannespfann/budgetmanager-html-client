import { Component, EventEmitter, Output } from "@angular/core";
import { Category } from "../models/category";
import { CategoryService } from "../services/category.service";
import { MessagingService } from "../services/message.service";
import { CategoryUpdatedMessage } from "../services/category-updated-message";

@Component({
    selector: 'add-category-component',
    templateUrl: './add-category.component.html'
})
export class AddCategoryComponent{

    private name:string;

    

    constructor(
            private categoryService:CategoryService,
            private messageService: MessagingService){
        this.name = "";
    }

        public save(): void {
        
        console.log("Add new category!");

        this.categoryService.addNewCategory(this.name);
        this.messageService.publish(new CategoryUpdatedMessage());

        this.name = "";       
    }


}