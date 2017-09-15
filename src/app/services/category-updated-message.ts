
import { Category } from "../models/category";
import { CategoriesModifiedMessage } from "./categories-modified-message";

export class CategoryUpdatedMessage {
    
    private category: Category;

    constructor(aCategory:Category){
        this.category = aCategory;
    }

    public getCategory(): Category {
        return this.category;
    } 
}