
import { Category } from "../models/category";
import { CategoriesModifiedMessage } from "./categories-modified-message";

export class CategoryUpdatedMessage extends CategoriesModifiedMessage {
    
    private category: Category;

    constructor(aCategory:Category){
        super();

        this.category = aCategory;
    }

    public getCategory(): Category {
        return this.category;
    }

    
}