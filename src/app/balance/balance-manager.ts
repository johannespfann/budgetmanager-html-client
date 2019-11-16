import { Entry } from '../models/entry';

export class BalanceManager {

    public positivEntries: Entry[] = [];
    public negativEntries: Entry[] = [];
    public balance = 0;
    public name: string;

    constructor(value: string, entries: Entry[]) {
        this.name = value;
        this.splitEntries(entries.slice(0));
        this.calculateBalance(entries);
    }

    private splitEntries(entries: Entry[]): void {
        entries.forEach( (entry: Entry) => {
            if (entry.amount >= 0) {
                this.positivEntries.push(entry);
            }
            if (entry.amount < 0) {
                this.negativEntries.push(entry);
            }
        });
    }

    private calculateBalance(entries: Entry[]): void {
        let sum = 0;
        entries.forEach( (entry: Entry) => {
            sum = sum + entry.amount;
        });
        this.balance = sum;
    }
}
