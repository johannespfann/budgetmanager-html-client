import { Tag } from "./tag";
import { Category } from "./category";
import { DateUtil } from "../utils/date-util";
import { HashUtil } from "../utils/hash-util";

export class Entry {

    public hash:string;

    public amount: number;

    public memo: string;

    public category: Category;


    private constructor(){
    }

    public static copy(aEntry: Entry): Entry {
        let entry: Entry = new Entry();

        entry.hash = aEntry.hash;
        entry.amount = aEntry.amount;

        // Copy Category if category is not undefined
        if(aEntry.category){
            let category: Category = Category.copy(aEntry.category);
            entry.category = category;
        }

        entry.memo = aEntry.memo;

        return entry;
    }

    public static create(aAmount: number): Entry {
        let entry: Entry = new Entry();
        entry.amount =  aAmount;
        entry.hash = HashUtil.getUniqueHash(aAmount.toString());
        return entry;
    }


    /**
     * setter
     */

    public setAmount(aAmount: number): void{
        this.amount = aAmount;
    }

    public setMemo(aMemo: string): void {
        this.memo = aMemo;
    }

    public setCategory(aCategory: Category): void {
        this.category = aCategory;
    }


    /**
     * getter
     */

    public getId(): string {
        return this.hash;
    }

    public getAmount(): number {
        return this.amount;
    }

    public getMemo(): string {
        return this.memo;
    }

    public getCategory(): Category {
        return this.category;
    }

}


