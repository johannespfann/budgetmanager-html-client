
/**
 * Category is implemented as a Value Object
 */
import { LogUtil } from "../utils/log-util";

export class Category {
    
    private id: string;

    private name: string;

    private constructor(){
        // Default
    }

    public static copy(aCategory: Category): Category {
        let category: Category = new Category();
        category.id = aCategory.id;
        category.name = aCategory.name;
        return category;
    }

    public static create(aName: string): Category {
        let category:  Category = new Category();
        category.name = aName;
        return category;
    }

    /**
     * setter
     */

    public setId (aId: string): Category {
        let category: Category = Category.copy(this);
        category.id = aId;
        return category
    }

    public setName(aName: string): Category {
        let category: Category = Category.copy(this);
        category.id = this.id;
        return category;
    }

    /**
     * getter
     */

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name
    }
}