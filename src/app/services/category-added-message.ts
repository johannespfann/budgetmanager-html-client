
import { Category } from "../models/category";

export class CategoryAddedMessage {
    
    private category: Category;

    constructor(aCategory:Category){
        this.category = aCategory;
    }

    public getCategory(): Category {
        return this.category;
    } 
}