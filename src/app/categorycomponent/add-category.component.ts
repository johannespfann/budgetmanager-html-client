import { Component } from "@angular/core";

@Component({
    selector: 'add-category-component',
    templateUrl: './add-category.component.html'
})
export class AddCategoryComponent{

    private name:string;

    constructor(){
        this.name = "";
    }
}