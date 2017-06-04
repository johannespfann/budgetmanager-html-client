import { Tag } from "./tag";
import { Category } from "./category";

export class Entry {

    id:number;

    amount: number;

    memo: string;

    current_date: number;

    category: Category;

    tags: Array<Tag>;

}