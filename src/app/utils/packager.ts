import { EntryPackage } from '../historycomponent/entry-package';
import { Entry } from '../models/entry';

export class Packager {

    public splitInMonth(entries: Entry[]): EntryPackage[] {
        console.log('Start to split entries: ' + entries.length);
        let entryPackages: EntryPackage[] = [];
        let entriesTemp: Entry[] = entries;

        entries.forEach( data => console.log('--> ') + JSON.stringify(data));
        console.log('Start to split entries: ' + JSON.stringify(entries));

        let index = 0;
        while(true) {
            console.log('Neuer Schleifendurchlauf');
            
            if (entriesTemp.length === 0){
                console.log('keine entries mehr da -> break');
                break;
            }

            entries.forEach( (entry: Entry) => {
                console.log('nehme entry ' + JSON.stringify(entry));
                let foundEntries: Entry[] = [];
                console.log(' und ueberpruefe mit: ');
                
                foundEntries = entriesTemp.filter( (entryFilter: Entry) => {
                    console.log(' -> ' + JSON.stringify(entryFilter.amount));
                    return this.isInSameMonth(entry.created_at, entryFilter);
                });

                console.log('Found Entries: ' + foundEntries.length);

                foundEntries.forEach((entryDelete: Entry) => {
                    this.removeElement(entriesTemp, entryDelete);
                });


                console.log('Found Entries: ' + foundEntries.length);
                if(foundEntries.length > 0) {
                    let entryPackage = new EntryPackage();
                    entryPackage.entries = foundEntries;
                    console.log('Push entryPackage with Entries: ' + entryPackage.entries.length);
                    entryPackages.push(entryPackage);
                }

            });
            index++;

        }

        return entryPackages;
    }

    private removeElement(entries: Entry[], entry: Entry): Entry[] {
        console.log('DeleteEntries: ' + JSON.stringify(entries.length));
        let index = entries.indexOf(entry);

        if (index !== -1) {
            entries.splice(index, 1);
        }
        console.log('Finished DeleteEntries: ' + JSON.stringify(entries.length));
        return entries;
    }

    private isInSameMonth(currentMonth: Date, entry: Entry): boolean {
        let entryMonth: Date = entry.created_at;
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