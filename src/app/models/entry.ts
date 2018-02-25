import { Tag } from "./tag";
import { Category } from "./category";
import { DateUtil } from "../utils/date-util";
import { HashUtil } from "../utils/hash-util";
import { LogUtil } from "../utils/log-util";

export class Entry {

    public hash:string;

    public amount: number;

    public memo: string;

    public category: Category;

    public created_at: Date;

    public tags:Array<Tag>;

    


    private constructor(){
        this.tags = new Array<Tag>();
    }

    public static copy(aEntry: Entry): Entry {
        let entry: Entry = new Entry();

        entry.hash = aEntry.hash;
        entry.amount = aEntry.amount;

        if(aEntry.category){
            let category: Category = Category.copy(aEntry.category);
            entry.category = category;
        }

        entry.created_at = new Date(aEntry.created_at);
        entry.memo = aEntry.memo;
        entry.tags = aEntry.tags;
        
        return entry;
    }

    public static create(aAmount: number): Entry {
        let entry: Entry = new Entry();
        entry.amount =  aAmount;
        entry.created_at = new Date();
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

    public getCreated_at(): Date {
        return this.created_at;
    }

}


