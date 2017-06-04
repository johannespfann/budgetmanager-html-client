import { Tag } from "./tag";
import { Category } from "./category";

export class Entry {

    id:number;

    amount: number;

    memo: string;

    current_date: number;

    category: Category;

    tags: Array<Tag>;


    public copy(): Entry{
        let entry: Entry = new Entry();
        entry.id = this.id;
        entry.amount = this.amount;
        entry.memo = this.memo;
        entry.current_date = this.current_date;
        entry.category = this.category;
        entry.tags = this.tags;
        return entry;
    }

}