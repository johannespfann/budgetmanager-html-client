import { Tag } from './tag';
import { HashUtil } from '../utils/hash-util';

export class Entry {

    public hash: string;

    public created_at: Date;

    public amount: number;

    public currency: string;

    public memo: string;

    public tags: Tag[];

    public constructor() {
        this.tags = new Array<Tag>();
    }

    public static copy(aEntry: Entry): Entry {
        const entry: Entry = new Entry();

        entry.hash = aEntry.hash;
        entry.amount = aEntry.amount;
        entry.currency = aEntry.currency;

        entry.created_at = new Date(aEntry.created_at);
        entry.memo = aEntry.memo;
        entry.tags = aEntry.tags;

        return entry;
    }

    public static create(aAmount: number, aCurrency: string): Entry {
        const entry: Entry = new Entry();
        entry.amount =  aAmount;
        entry.currency = aCurrency;
        entry.created_at = new Date();
        entry.hash = HashUtil.getUniqueHash().toString();
        return entry;
    }

    /**
     * setter
     */

    public setAmount(aAmount: number): void {
        this.amount = aAmount;
    }

    public setMemo(aMemo: string): void {
        this.memo = aMemo;
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


    public getCreated_at(): Date {
        return this.created_at;
    }

}


