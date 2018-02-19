
import { HashUtil } from "../utils/hash-util";

export class Category {
    
    public hash: string;

    public name: string;

    private constructor(){
        // Default
    }

    public static copy(aCategory: Category): Category {
        let category: Category = new Category();
        category.hash = aCategory.hash;
        category.name = aCategory.name;
        return category;
    }

    public static create(aName: string): Category {
        let category:  Category = new Category();
        category.hash = HashUtil.getUniqueHash(null);
        category.name = aName;
        return category;
    }

}