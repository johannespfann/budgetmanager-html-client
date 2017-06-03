import { Tag } from "./tag";
import { Category } from "./category";

export class Entry {

    id:number;

    amount: number;

    memo: string;

    current_date: string;

    category: Category;

    tags: Array<Tag>;

}