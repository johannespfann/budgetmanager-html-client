import { Tag } from "./tag";
import { Category } from "./category";

export class Entry {

    id:number;

    sum: number;

    memo: string;

    current_date: string;

    category: Category;

    tags: Array<Tag>;

}