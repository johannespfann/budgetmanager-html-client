
export class Category {
    
    id: number;

    name: string; 

    public copy():Category{
        let category: Category = new Category();
        category.id = this.id;
        category.name = this.name;
        return category;
    }
}