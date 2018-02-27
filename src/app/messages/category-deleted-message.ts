
import { Category } from "../models/category";

export class CategoryDeletedMessage {
    
    private deletedCategory: Category;

    private fallbackCategory: Category;

    constructor(aDeletedCategory:Category, aFallBackCategory:Category){
        this.deletedCategory = aDeletedCategory;
        this.fallbackCategory = aFallBackCategory;
    }

    public getCategory(): Category {
        return this.deletedCategory;
    } 

    public getFallBackCategory(): Category{
        return this.fallbackCategory;
    }
}