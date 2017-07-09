import { Tag } from "./tag";
import { Category } from "./category";
import { DateUtil } from "../utils/date-util";

export class Entry {

    private id:number;

    private amount: number;

    private memo: string;

    private creation_date: number;

    private category: Category;

    private tags: Array<Tag>;

    public constructor(aAmount: number){
        this.amount = aAmount;
        this.category = Category.create('');
        this.tags = new Array<Tag>();
    }

    private copyEntry(aEntry: Entry): Entry {
        let entry: Entry = new Entry(aEntry.amount);
        entry.creation_date = this.creation_date;

        // Copy Category
        let category: Category = Category.create(this.category.getName());
        category = category.setId(this.category.getId());

        entry.category = category;
        entry.memo = this.memo;

        // TODO Copy Tags when using tags 
        // TODO Test copy Tags - slice should not enough
        let tags: Array<Tag> = new Array<Tag>();
        tags = this.tags.slice();

        return entry;
    }

    /**
     * setter
     */

    public setId(aId: number): Entry{
        let entry: Entry = this.copyEntry(this);
        entry.id = aId;
        return entry;
    }

    public setAmount(aAmount: number): Entry{
        let entry: Entry = this.copyEntry(this);
        entry.amount = aAmount;
        return entry;
    }

    public setMemo(aMemo: string): Entry {
        let entry: Entry = this.copyEntry(this);
        entry.memo = aMemo;
        return entry;
    }

    public setCategory(aCategory: Category): Entry {
        let entry: Entry = this.copyEntry(this);
        entry.category = aCategory;
        return entry;
    }

    public setCurrentDateNow(): Entry {
        let entry: Entry = this.copyEntry(this);
        entry.creation_date = DateUtil.getCurrentDate();
        return entry
    }

    public setCurrentDate(aDate: number): Entry {
        let entry: Entry = this.copyEntry(this);
        entry.creation_date = aDate;
        return entry;
    }

    public addTag(aTag: Tag): Entry{
        let entry: Entry = this.copyEntry(this);
        entry.tags.push(aTag)
        return entry;
    }


    /**
     * getter
     */

    public getId(): number {
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


