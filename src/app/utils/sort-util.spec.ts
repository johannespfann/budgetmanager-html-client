
import { Entry } from '../models/entry';
import { SortUtil } from './sort-util';
import { EntryPackage } from '../models/entry-package';




describe('sort-util', function () {



    it('should sort entries so that the last created entry is at the first position', () => {
        // prepare
        const firstEntry = Entry.create(1, 'EUR');
        const secondEntry = Entry.create(2, 'EUR');
        const thirdEntry = Entry.create(3, 'EUR');
        const forthEntry = Entry.create(4, 'EUR');

        const dateOne: Date = new Date(2017, 3, 12, 0, 0, 0, 0);
        firstEntry.created_at = dateOne;
        const dateTwo: Date = new Date(2018, 3, 15, 0, 0, 0, 0);
        secondEntry.created_at = dateTwo;
        const dateThree: Date = new Date(2018, 3, 2, 0, 0, 0, 0);
        thirdEntry.created_at = dateThree;
        const dateFour: Date = new Date(2018, 1, 15, 0, 0, 0, 0);
        forthEntry.created_at = dateFour;

        const entries: Entry[] = [];
        entries.push(firstEntry);
        entries.push(secondEntry);
        entries.push(thirdEntry);
        entries.push(forthEntry);

        // execute
        const sortedEntries = SortUtil.sortEntriesByTimeDESC(entries);

        // validate
        expect(sortedEntries[0].created_at).toEqual(secondEntry.created_at);
    });

    it('should sort entries so that the last created entry is at the last position', () => {
        // prepare
        const firstEntry = Entry.create(1, 'EUR');
        const secondEntry = Entry.create(2, 'EUR');
        const thirdEntry = Entry.create(3, 'EUR');
        const forthEntry = Entry.create(4, 'EUR');

        const dateOne: Date = new Date(2017, 3, 12, 0, 0, 0, 0);
        firstEntry.created_at = dateOne;
        const dateTwo: Date = new Date(2018, 3, 15, 0, 0, 0, 0);
        secondEntry.created_at = dateTwo;
        const dateThree: Date = new Date(2018, 3, 2, 0, 0, 0, 0);
        thirdEntry.created_at = dateThree;
        const dateFour: Date = new Date(2018, 1, 15, 0, 0, 0, 0);
        forthEntry.created_at = dateFour;

        const entries: Entry[] = [];
        entries.push(firstEntry);
        entries.push(secondEntry);
        entries.push(thirdEntry);
        entries.push(forthEntry);

        // execute
        const sortedEntries = SortUtil.sortEntriesByTimeASC(entries);

        // validate
        expect(sortedEntries[3].created_at.getTime()).toEqual(secondEntry.created_at.getTime());
    });


    it('should sort package so that the last created package is at the first position', () => {
        // prepare
        const firstPackage = new EntryPackage();
        firstPackage.date = new Date(2017, 3, 12, 0, 0, 0, 0);
        const secondPackage = new EntryPackage();
        secondPackage.date = new Date(2018, 3, 12, 0, 0, 0, 0);
        const thirdPackage = new EntryPackage();
        thirdPackage.date = new Date(2013, 3, 12, 0, 0, 0, 0);
        const packageArray: EntryPackage[] = [];
        packageArray.push(firstPackage);
        packageArray.push(secondPackage);
        packageArray.push(thirdPackage);

        // execute
        const sortedEntries = SortUtil.sortPackagesByTimeDESC(packageArray);

        // validate
        expect(sortedEntries[0].date.getTime).toEqual(secondPackage.date.getTime);
    });

    it('should sort package so that the last created package is at the last position', () => {
        // prepare
        const firstPackage = new EntryPackage();
        firstPackage.date = new Date(2017, 3, 12, 0, 0, 0, 0);
        const secondPackage = new EntryPackage();
        secondPackage.date = new Date(2018, 3, 12, 0, 0, 0, 0);
        const thirdPackage = new EntryPackage();
        thirdPackage.date = new Date(2013, 3, 12, 0, 0, 0, 0);
        const packageArray: EntryPackage[] = [];
        packageArray.push(firstPackage);
        packageArray.push(secondPackage);
        packageArray.push(thirdPackage);

        // execute
        const sortedEntries = SortUtil.sortPackagesByTimeDESC(packageArray);

        // validate
        expect(sortedEntries[2].date.getTime).toEqual(secondPackage.date.getTime);
    });

    it('should sort entires and get entry created at 17.9.2019', () => {
        // prepare

        const entryOne = new Entry();
        entryOne.created_at = new Date(2017, 1, 4);
        const entryTwo = new Entry();
        entryTwo.created_at = new Date(2018, 1, 4);

        const entryThree = new Entry();
        entryThree.created_at = new Date(2019, 1, 4);
        const entryFour = new Entry();
        entryFour.created_at = new Date(2019, 2, 17);

        const entries: Entry[] = [] ;
        entries.push(entryOne);
        entries.push(entryTwo);
        entries.push(entryFour);
        entries.push(entryThree);


        // execute
        const latestEntry = SortUtil.getLatestCreatedEntry(entries);

        // validate
        expect(latestEntry).toEqual(entryFour);
    });


});
