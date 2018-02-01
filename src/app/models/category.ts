
import { HashUtil } from "../utils/hash-util";

export class Category {
    
    public id: string;

    public name: string;

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
        category.id = HashUtil.getUniqueHash(null);
        category.name = aName;
        return category;
    }

    /**
     * setter
     */
    public setName(aName: string): void {
        this.id = this.id;
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