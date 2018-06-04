import { EntryPackage } from '../historycomponent/entry-package';
import { Entry } from '../models/entry';
import { DateUtil } from './date-util';

export class Packager {

    public splitInMonth(entries: Entry[]): EntryPackage[] {
        const entryPackages: EntryPackage[] = [];
        const entriesTemp: Entry[] = entries.slice(0);

        while (true) {
            if (entriesTemp.length === 0) {
                break;
            }

            entries.forEach( (entry: Entry) => {
                const packagename: string = DateUtil.getNameOfMonth(entry.created_at) + '/' + entry.created_at.getFullYear();
                let foundEntries: Entry[] = [];

                foundEntries = entriesTemp.filter( (entryFilter: Entry) => {
                    return this.isInSameMonth(entry.created_at, entryFilter);
                });


                foundEntries.forEach((entryDelete: Entry) => {
                    this.removeElement(entriesTemp, entryDelete);
                });

                if (foundEntries.length > 0) {
                    const entryPackage = new EntryPackage();
                    entryPackage.entries = foundEntries;
                    entryPackage.packagename = packagename;
                    entryPackages.push(entryPackage);
                }
            });
        }

        return entryPackages;
    }

    private removeElement(entries: Entry[], entry: Entry): Entry[] {
        const index = entries.indexOf(entry);

        if (index !== -1) {
            entries.splice(index, 1);
        }
        return entries;
    }

    private isInSameMonth(currentMonth: Date, entry: Entry): boolean {
        const entryMonth: Date = entry.created_at;
        if (this.isSameMonth(currentMonth, entryMonth) && this.isSameYear(currentMonth, entryMonth)) {
            return true;
        }
        return false;
    }

    private isSameYear(dateOne: Date, date: Date): boolean {
        if (dateOne.getFullYear() === date.getFullYear()) {
            return true;
        }
        return false;
    }

    private isSameMonth(dateOne: Date, dateTwo: Date): boolean {
        if (dateOne.getMonth() === dateTwo.getMonth()) {
            return true;
        }
        return false;
    }
}
