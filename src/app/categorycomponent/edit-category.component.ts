import { Component } from "@angular/core";

@Component({
    selector: 'edit-category-component',
    templateUrl: './edit-category.component.html'
})
export class EditCategoryComponent{

    private name:string;

    constructor(){
        this.name = "";
    }
}