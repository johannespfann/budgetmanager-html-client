
import { Category } from "../models/category";

export class CategoryUpdatedMessage {
    
    private category: Category;

    constructor(aCategory:Category){
        this.category = aCategory;
    }

    public getCategory(): Category {
        return this.category;
    } 
}