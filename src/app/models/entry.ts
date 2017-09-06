import { Tag } from "./tag";
import { Category } from "./category";
import { DateUtil } from "../utils/date-util";
import { HashUtil } from "../utils/hash-util";

export class Entry {

    private id:string;

    private amount: number;

    private memo: string;

    private creation_date: number;

    private category: Category;

    private tags: Array<Tag>;

    private constructor(){
        this.tags = new Array<Tag>();
    }

    private static copy(aEntry: Entry): Entry {
        let entry: Entry = new Entry();

        entry.id = aEntry.id;
        entry.amount = aEntry.amount;
        entry.creation_date = aEntry.creation_date;
        // Copy Category if category is not undefined
        if(aEntry.category){
            let category: Category = Category.create(aEntry.category.getName());
            category = category.setId(aEntry.category.getId());
            entry.category = category;
        }
        entry.memo = aEntry.memo;
        // TODO Copy Tags when using tags 
        // TODO Test copy Tags - slice should not enough
        let tags: Array<Tag> = new Array<Tag>();
        tags = aEntry.tags.slice();

        return entry;
    }

    public static create(aAmount: number): Entry {
        let entry: Entry = new Entry();
        entry.amount =  aAmount;
        entry.id = HashUtil.getUniqueHash(aAmount.toString());
        return entry;
    }

    /**
     * setter
     */

    public setAmount(aAmount: number): Entry{
        let entry: Entry = Entry.copy(this);
        entry.amount = aAmount;
        return entry;
    }

    public setMemo(aMemo: string): Entry {
        let entry: Entry = Entry.copy(this);
        entry.memo = aMemo;
        return entry;
    }

    public setCategory(aCategory: Category): Entry {
        let entry: Entry = Entry.copy(this);
        entry.category = aCategory;
        return entry;
    }

    public setCurrentDateNow(): Entry {
        let entry: Entry = Entry.copy(this);
        entry.creation_date = DateUtil.getCurrentDate();
        return entry
    }

    public setCurrentDate(aDate: number): Entry {
        let entry: Entry = Entry.copy(this);
        entry.creation_date = aDate;
        return entry;
    }

    public addTag(aTag: Tag): Entry{
        let entry: Entry = Entry.copy(this);
        entry.tags.push(aTag)
        return entry;
    }


    /**
     * getter
     */

    public getId(): string {
        return this.id;
    }

    public getAmount(): number {
        return this.amount;
    }

    public getMemo(): string {
        return this.memo;
    }

    public getCreationDate(): number{
        return this.creation_date;
    }

    public getCategory(): Category {
        return this.category;
    }

    public getTags(): Tag[] {
        return this.tags;
    }

}


