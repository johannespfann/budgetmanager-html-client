
/**
 * Category is implemented as a Value Object
 */
export class Category {
    
    private id: number;


    private name: string;

    public constructor(aName: string){
        this.name = aName;
    }

    /**
     * setter
     */

    public setId (aId: number): Category {
        let category: Category = new Category(this.name);
        category.id = aId;
        return category
    }

    public setName(aName: string): Category {
        let category: Category = new Category(aName);
        category.id = this.id;
        return category;
    }

    /**
     * getter
     */

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name
    }
}