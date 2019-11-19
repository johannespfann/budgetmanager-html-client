import { Packager } from './packager';
import { Entry } from '../models/entry';
import { EntryPackage } from '../balance/entry-package';

describe('packager', function () {

    beforeEach(() => {

    });

    it('should split entries in 3 month', () => {
        // prepare
        const entrieFirst = Entry.create(1, 'EUR');
        const entrieSecond = Entry.create(2, 'EUR');
        const entrieThird = Entry.create(3, 'EUR');
        const entrieFourth = Entry.create(4, 'EUR');

        const dateOne: Date = new Date(2017, 3, 12, 0, 0, 0, 0);
        entrieFirst.created_at = dateOne;
        const dateTwo: Date = new Date(2018, 3, 15, 0, 0, 0, 0);
        entrieSecond.created_at = dateTwo;
        const dateThree: Date = new Date(2018, 3, 2, 0, 0, 0, 0);
        entrieThird.created_at = dateThree;
        const dateFour: Date = new Date(2018, 1, 15, 0, 0, 0, 0);
        entrieFourth.created_at = dateFour;

        const entries: Entry[] = [];
        entries.push(entrieFirst);
        entries.push(entrieSecond);
        entries.push(entrieThird);
        entries.push(entrieFourth);

        const packager: Packager = new Packager();
        const entryPackages: EntryPackage[] = packager.splitInMonth(entries);

        expect(entryPackages.length === 3);
    });

});
