import { Message } from "./message";
import { Category } from "../models/category";

export class CategoryUpdatedMessage {

    private category: Category;

    constructor(aCategory: Category){
        console.log("Init CategoryUpdatedMessage");
        this.category = aCategory;
    }

    public getCategory(): Category {
        return this.category;
    }

}